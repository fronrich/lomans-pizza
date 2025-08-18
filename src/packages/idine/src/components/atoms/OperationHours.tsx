import { useMemo } from "react";
import useProfilesContext from "../../hooks/contexts/useProfileContext";
import prettyHours from "../../utils/prettyHours";

const OperationHours = () => {
  const { restaurant } = useProfilesContext();
  const operationHoursText: string = useMemo(() => {
    if (!restaurant) {
      return "Closed";
    }
    return prettyHours(restaurant?.defaultOperationHours);
  }, [restaurant]);

  return <span>{operationHoursText}</span>;
};

export default OperationHours;
