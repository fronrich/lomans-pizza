import { createContext } from "react";
import AuthContextMethods from "../types/AuthContextMethods";

const AuthContext = createContext<AuthContextMethods | null>(null);

export default AuthContext;
