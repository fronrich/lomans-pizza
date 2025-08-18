import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { config } from "dotenv";
import PilotRestaurant from "../templates/PilotRestaurant";
import PilotTables from "../templates/PilotTables";
import PilotMenu from "../templates/PilotMenu";

config(); // Load .env variables

// Firebase config from .env
const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, process.env.VITE_DB ?? "");

const createDoc = async <DocumentType extends Record<string, unknown>>(
  collectionName: string,
  id: string,
  data: DocumentType
) => {
  try {
    await setDoc(doc(db, collectionName, id), {
      ...data,
      id: id,
    });
    console.log(`Document written with ID: ${id}`);
  } catch (e) {
    console.error("Error adding document:", e);
  }
};

(async () => {
  try {
    console.log("seeding db...");

    // create tables
    await Promise.all(
      PilotTables.map((table) => createDoc("tables", table.id, { ...table }))
    );
    // create menu
    await Promise.all(
      PilotMenu.map((item) => createDoc("menuItems", item.id, { ...item }))
    );
    // create restaurant
    await createDoc("restaurants", PilotRestaurant.id, { ...PilotRestaurant });
    console.log("Done! Feel free to close the program with CTRL + C.");
    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
})();
