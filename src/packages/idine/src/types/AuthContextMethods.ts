import User from "./User";

export default interface AuthContextMethods {
  googleSignIn: () => Promise<{ newUserCreated: boolean; currentUser: User }>;
  googleSignOut: () => Promise<void>;
  isAuthReady: boolean;
}
