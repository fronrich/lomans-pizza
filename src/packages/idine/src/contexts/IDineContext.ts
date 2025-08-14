import { createContext } from "react";
import IDineContextMethods from "../types/IDineContextMethods";

const IDineContext = createContext<IDineContextMethods | null>(null);

export default IDineContext;
