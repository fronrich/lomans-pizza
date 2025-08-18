import { createContext } from "react";
import ProfilesContextMethods from "../types/ProfileContextMethods";
const ProfilesContext = createContext<ProfilesContextMethods | null>(null);

export default ProfilesContext;
