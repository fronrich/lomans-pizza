import { use } from "react";
import IDineContext from "../../contexts/IDineContext";
import IDineContextMethods from "../../types/IDineContextMethods";

const useIDineContext: () => IDineContextMethods = () =>
  use(IDineContext) as IDineContextMethods;

export default useIDineContext;
