import { use } from "react";
import FirebaseContext from "../../contexts/FirebaseContext";
import FirebaseContextValue from "../../types/FirebaseContextValue";

const useFirebaseContext: () => FirebaseContextValue = () =>
  use(FirebaseContext) as FirebaseContextValue;

export default useFirebaseContext;
