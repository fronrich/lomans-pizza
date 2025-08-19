import { useCallback } from "react";
import { Icon } from "@iconify/react";

/**
 * Creates an iconify icon that is never recomputed
 * on state changes
 *
 * useful for parts of application which rerender a lot
 */
export default (icon: string) => {
  return useCallback(
    () => <Icon icon={icon} className="text-surface-500 text-lg" />,
    []
  );
};
