import { use } from "react";
import ProfilesContext from "../../contexts/ProfileContext";
import ProfilesContextMethods from "../../types/ProfileContextMethods";

const useProfilesContext: () => ProfilesContextMethods = () =>
  use(ProfilesContext) as ProfilesContextMethods;

export default useProfilesContext;
