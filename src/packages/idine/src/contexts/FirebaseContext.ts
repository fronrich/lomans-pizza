import { createContext } from "react";
import FirebaseContextValue from "../types/FirebaseContextValue";
const FirebaseContext = createContext<FirebaseContextValue | null>(null);

export default FirebaseContext;
