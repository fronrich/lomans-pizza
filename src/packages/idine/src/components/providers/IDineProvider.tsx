import { FC, ReactNode } from "react";
import FirebaseProvider from "./FirebaseProvider";
import ProfilesProvider from "./ProfilesProvider";

import AuthProvider from "./AuthProvider";
import ReservationFormProvider from "./ReservationFormProvider";

interface IDineProviderProps {
  children: ReactNode;
}

/**
 * The primary idine provider that provides the sdk
 * with all it's firebase connections and global state
 */
const IDineProvider: FC<IDineProviderProps> = ({ children }) => {
  return (
    <FirebaseProvider>
      <ProfilesProvider>
        <AuthProvider>
          <ReservationFormProvider>{children}</ReservationFormProvider>
        </AuthProvider>
      </ProfilesProvider>
    </FirebaseProvider>
  );
};

export default IDineProvider;
