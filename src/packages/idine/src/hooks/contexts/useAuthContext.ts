import { use } from "react";
import AuthContext from "../../contexts/AuthContext";
import AuthContextMethods from "../../types/AuthContextMethods";

const useAuthContext: () => AuthContextMethods = () =>
  use(AuthContext) as AuthContextMethods;

export default useAuthContext;
