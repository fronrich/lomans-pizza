import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  AuthError,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import useUsersCollection from "../firestore/useUsersCollection";
import useFirebaseContext from "../../contexts/useFirebaseContext";
import useProfilesContext from "../../contexts/useProfileContext";
import UserRole from "../../../enums/UserRole";
import IDineUser from "../../../types/User";
import { useEffect, useState } from "react";

export default () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const { getUserById, createUserWithId } = useUsersCollection();
  const { setCurrentUser } = useProfilesContext();
  const { app } = useFirebaseContext();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = async (): Promise<{
    newUserCreated: boolean;
    currentUser: IDineUser;
  }> => {
    let user: User | null = null;

    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info.
      user = result.user;

      // You can now update your UI to show the user as signed in!
      // For example, display their name, hide the sign-in button, show a sign-out button.
    } catch (error) {
      // Handle any errors that occur during sign-in
      const err: AuthError = error as AuthError;
      const errorCode = err.code;
      const errorMessage = err.message;

      console.error(
        "Oops! Error signing in with Google:",
        errorCode,
        errorMessage
      );

      if (errorCode === "auth/popup-closed-by-user") {
        console.log("User closed the Google sign-in pop-up. No worries!");
      }
    }

    if (!user) {
      throw new Error("user not found");
    }

    const { displayName, phoneNumber, email, uid } = user;

    // Create/fetch user in db
    let currentUser = await getUserById(uid);

    // if user does not exist in firestore create them
    if (currentUser) {
      console.log("user exists", currentUser);

      return { newUserCreated: false, currentUser };
    }

    // split display name
    const names: string[] = displayName?.trim().split(" ") ?? [];
    const firstName: string = names[0] ?? "";
    const lastName: string = names[names.length - 1] ?? "";

    const newUser: Omit<IDineUser, "id"> = {
      email: email ?? "",
      phone: phoneNumber ?? "",
      firstName,
      lastName,
      allergies: [],
      diets: [],
      reservationIds: [],
      role: UserRole.MEMBER,
    };

    await createUserWithId(uid, newUser);

    currentUser = { id: uid, ...newUser };
    // if the user does exist, use them as current user
    setCurrentUser(currentUser);

    return { newUserCreated: true, currentUser };
  };

  const googleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User successfully signed out!");
      return;
      // The onAuthStateChanged listener will automatically update your UI after this.
    } catch (error) {
      console.error("Trouble signing out:", error);
      return;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, phoneNumber, email, uid } = user;
        const currentUser = await getUserById(user.uid);

        // if null, add user to db here
        if (currentUser) {
          setCurrentUser(currentUser);
          console.log("signed in as", currentUser);
          setIsReady(true);
          return;
        }

        // split display name
        const names: string[] = displayName?.trim().split(" ") ?? [];
        const firstName: string = names[0] ?? "";
        const lastName: string = names[names.length - 1] ?? "";

        const newUser: Omit<IDineUser, "id"> = {
          email: email ?? "",
          phone: phoneNumber ?? "",
          firstName,
          lastName,
          allergies: [],
          diets: [],
          reservationIds: [],
          role: UserRole.MEMBER,
        };

        await createUserWithId(uid, newUser);

        // if the user does exist, use them as current user
        setCurrentUser({ id: uid, ...newUser });
        setIsReady(true);

        return;
      }

      setCurrentUser(null);
      console.log("not signed in");
      setIsReady(true);

      return;
    });

    // unsub on rerender
    return () => {
      unsubscribe();
    };
  }, [auth]);

  return { googleSignIn, googleSignOut, auth, isReady };
};
