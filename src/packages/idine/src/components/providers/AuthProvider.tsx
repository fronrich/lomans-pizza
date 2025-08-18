import { FC, ReactNode, useMemo } from "react";
import useAuth from "../../hooks/auth/useAuth";
import AuthContext from "../../contexts/AuthContext";
import AuthContextMethods from "../../types/AuthContextMethods";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { googleSignIn, googleSignOut, auth, isReady } = useAuth();

  const value: AuthContextMethods = useMemo(
    () => ({ googleSignIn, googleSignOut, isAuthReady: isReady }),
    [auth, isReady]
  );
  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
