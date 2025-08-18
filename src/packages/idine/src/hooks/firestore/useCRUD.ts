import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  QuerySnapshot,
  setDoc,
  Unsubscribe,
  updateDoc,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { v4 } from "uuid";
import useFirebaseContext from "../contexts/useFirebaseContext";

interface useCRUDParams {
  collectionName: string;
}

/**
 * utility for creating chunks of an array
 */
const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

/**
 * utilize basic crud functions on a specified collection
 */
export default <DocumentType extends object>({
  collectionName,
}: useCRUDParams) => {
  const { app } = useFirebaseContext();
  const db = getFirestore(app, import.meta.env.VITE_DB);
  const collectionRef = collection(db, collectionName);

  /**
   * create new entry in collection, automatically assigning id
   */
  const createDocument = async (
    data: Omit<DocumentType, "id">
  ): Promise<string> => {
    try {
      const id = v4();
      await setDoc(doc(db, collectionName, id), {
        ...data,
        id: id,
      });
      console.log("Document written with ID: ", id);
      return id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e; // Re-throw to allow component to handle
    }
  };

  /**
   * create new entry in collection, manually assigning id
   */
  const createDocumentWithId = async (
    id: string,
    data: Omit<DocumentType, "id">
  ): Promise<string> => {
    try {
      await setDoc(doc(db, collectionName, id), {
        ...data,
        id: id,
      });
      console.log("Document written with ID: ", id);
      return id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e; // Re-throw to allow component to handle
    }
  };

  /**
   * get all documents in a collection
   */
  const getAllDocuments = async (): Promise<DocumentType[]> => {
    try {
      const querySnapshot: QuerySnapshot<DocumentData> =
        await getDocs(collectionRef);
      const documents: DocumentType[] = querySnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
          }) as unknown as DocumentType
      );
      return documents;
    } catch (e) {
      console.error("Error getting documents: ", e);
      throw e;
    }
  };

  /**
   * get a single document
   */
  const getDocumentById = async (id: string): Promise<DocumentType | null> => {
    try {
      const docRef = doc(db, collectionName, id);
      const document = await getDoc(docRef);
      if (document.exists()) {
        return {
          ...document.data(),
        } as unknown as DocumentType;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (e) {
      console.error("Error getting document: ", e);
      throw e;
    }
  };

  const getDocumentsByQuery = async (
    field: keyof DocumentType,
    operator: WhereFilterOp,
    value: string | string[] | number | boolean | number[]
  ): Promise<DocumentType[]> => {
    try {
      // Special handling if operator === "in" and value is an array > 10
      if (operator === "in" && Array.isArray(value) && value.length > 10) {
        const chunks = chunkArray(value as string[], 10);

        const results = await Promise.all(
          chunks.map(async (chunk) => {
            const q = query(
              collectionRef,
              where(field as string, operator, chunk)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(
              (doc) =>
                ({
                  id: doc.id,
                  ...doc.data(),
                }) as DocumentType
            );
          })
        );

        return results.flat();
      }

      // Regular single query
      const q = query(collectionRef, where(field as string, operator, value));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as DocumentType
      );
    } catch (e) {
      console.error("Error getting documents by query: ", e);
      throw e;
    }
  };

  /**
   * Listen for real-time updates to a single document by its ID.
   */
  const subscribeToDocumentById = (
    id: string,
    callback: (document: DocumentType | null) => void
  ): Unsubscribe => {
    const docRef = doc(db, collectionName, id);
    const unsubscribe = onSnapshot(
      docRef,
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          callback({
            id: documentSnapshot.id, // Include ID for single document subscription
            ...documentSnapshot.data(),
          } as unknown as DocumentType);
        } else {
          console.log("No such document exists for real-time listener!");
          callback(null);
        }
      },
      (error) => {
        console.error("Error listening to single document: ", error);
      }
    );
    return unsubscribe;
  };

  /**
   * listen for real-time updates to documents
   */
  const subscribeToDocuments = (
    callback: (documents: DocumentType[]) => void
  ): Unsubscribe => {
    const unsubscribe = onSnapshot(
      collectionRef,
      (querySnapshot) => {
        const documents: DocumentType[] = querySnapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
            }) as unknown as DocumentType
        );
        callback(documents);
      },
      (error) => {
        console.error("Error listening to documents: ", error);
      }
    );
    return unsubscribe; // Return the unsubscribe function
  };

  /**
   * Listen for real-time updates with a query (e.g., bookings under a specific restaurant)
   */
  const subscribeToDocumentsByQuery = (
    key: keyof DocumentType,
    operator: WhereFilterOp,
    value: string | string[] | number | boolean | number[],
    callback: (documents: DocumentType[]) => void
  ): Unsubscribe => {
    // Helper to map snapshots into typed docs
    const mapSnapshot = (
      querySnapshot: QuerySnapshot<DocumentData>
    ): DocumentType[] =>
      querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as DocumentType
      );

    // Handle chunking for "in" with > 10 values
    if (operator === "in" && Array.isArray(value) && value.length > 10) {
      const chunks = chunkArray(value as string[], 10);
      const unsubscribes: Unsubscribe[] = [];

      // Keep a map of document results by id so we can merge updates cleanly
      const docsMap = new Map<string, DocumentType>();

      chunks.forEach((chunk) => {
        const q = query(collectionRef, where(key as string, operator, chunk));
        const unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            // Update local map
            querySnapshot.docs.forEach((doc) => {
              docsMap.set(doc.id, {
                id: doc.id,
                ...doc.data(),
              } as DocumentType);
            });

            // Emit merged results
            callback(Array.from(docsMap.values()));
          },
          (error) => {
            console.error("Error listening to queried documents: ", error);
          }
        );

        unsubscribes.push(unsubscribe);
      });

      // Return a cleanup function that unsubscribes all listeners
      return () => unsubscribes.forEach((u) => u());
    }

    // Regular single subscription
    const q = query(collectionRef, where(key as string, operator, value));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => callback(mapSnapshot(querySnapshot)),
      (error) => {
        console.error("Error listening to queried documents: ", error);
      }
    );

    return unsubscribe;
  };
  /**
   * update documentdata
   */
  const updateDocument = async (
    id: string,
    updates: Partial<Omit<DocumentType, "id">>
  ): Promise<void> => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { id, ...updates });
      console.log("Document successfully updated!");
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  };

  /**
   *  delete a document
   */
  const deleteDocument = async (id: string): Promise<void> => {
    try {
      const travelDocRef = doc(db, "travels", id);
      await deleteDoc(travelDocRef);
      console.log("Document successfully deleted!");
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  };

  return {
    createDocument,
    createDocumentWithId,
    getAllDocuments,
    getDocumentById,
    getDocumentsByQuery,
    subscribeToDocumentById,
    subscribeToDocuments,
    subscribeToDocumentsByQuery,
    updateDocument,
    deleteDocument,
  };
};
