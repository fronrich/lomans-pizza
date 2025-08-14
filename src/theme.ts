import { createTheme } from "flowbite-react";

export default createTheme({
  button: {
    base: "relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 transition-all cursor-pointer font-title uppercase shadow",
    color: {
      secondary:
        "bg-secondary-700 text-surface-950 hover:bg-secondary-800 focus:ring-secondary-300 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800",
    },
    outlineColor: {
      secondary:
        "border border-secondary-700 text-secondary-700 hover:border-secondary-800 hover:bg-secondary-800 hover:text-white focus:ring-secondary-300 dark:border-secondary-600 dark:text-secondary-500 dark:hover:border-secondary-700 dark:hover:bg-secondary-700 dark:hover:text-white dark:focus:ring-secondary-800",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});
