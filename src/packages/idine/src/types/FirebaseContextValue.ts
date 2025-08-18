import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";

export default interface FirebaseContextValue {
  app: FirebaseApp;
  analytics: Analytics;
}
