import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FirebaseContext from "../../contexts/FirebaseContext";
import { FC, ReactNode, useMemo } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

interface FirebaseProviderProps {
  children: ReactNode;
}

const FirebaseProvider: FC<FirebaseProviderProps> = ({ children }) => {
  const value = useMemo(() => {
    const app = initializeApp(firebaseConfig);
    return {
      app,
      analytics: getAnalytics(app),
    };
  }, []);
  return <FirebaseContext value={value}>{children}</FirebaseContext>;
};

export default FirebaseProvider;
