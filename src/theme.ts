import { createTheme } from "flowbite-react";

export default createTheme({
  button: {
    base: "relative flex items-center justify-center rounded-lg text-center focus:outline-none focus:ring-4 transition-all cursor-pointer font-base font-semibold uppercase shadow border-1 ",
    color: {
      default:
        "bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-primary-700",
      secondary:
        "bg-secondary-700 text-surface-950 hover:bg-secondary-800 focus:ring-secondary-300 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800 border-secondary-800",
    },
    outlineColor: {
      secondary:
        "border border-secondary-700 text-secondary-700 hover:border-secondary-800 hover:bg-secondary-800 hover:text-white focus:ring-secondary-300 dark:border-secondary-600 dark:text-secondary-500 dark:hover:border-secondary-700 dark:hover:bg-secondary-700 dark:hover:text-white dark:focus:ring-secondary-800",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
  table: {
    root: {
      base: "w-full text-left text-sm text-gray-500",
      shadow:
        "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md",
      wrapper: "relative",
    },
    body: {
      base: "group/body",
      cell: {
        base: "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
      },
    },
    head: {
      base: "group/head text-xs uppercase text-gray-700",
      cell: {
        base: "bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg",
      },
    },
    row: {
      base: "group/row",
      hovered: "hover:bg-gray-50",
      striped: "odd:bg-white even:bg-gray-50",
    },
  },
  tabs: {
    tablist: {
      variant: {
        underline:
          "-mb-px flex-nowrap border-b border-gray-200 dark:border-gray-700",
      },
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 disabled:blur-xs transition-all",
        variant: {
          underline: {
            base: "w-full rounded-t-lg !flex-nowrap lg:text-base text-xs !z-0 lg:flex-row flex-col",
            active: {
              on: "rounded-t-lg border-b-4 border-primary-500 text-primary-500 font-semibold ",
              off: "border-b-2 border-transparent text-surface-950 hover:border-primary-500 hover:text-primary-500 ",
            },
          },
          fullWidth: {
            base: "ml-0 flex w-full !rounded-t-xl first:ml-0 !border-none font-base lg:font-semibold uppercase lg:text-base text-xs !z-0 lg:flex-row flex-col",
            active: {
              on: "rounded-none bg-primary-100 p-4 text-primary-900 dark:bg-primary-600 dark:text-white",
              off: "rounded-none bg-white hover:bg-primary-50 hover:text-primary-700 dark:bg-surface-600 dark:hover:bg-primary-700 dark:hover:text-white",
            },
          },
        },
      },
    },
    tabitemcontainer: {
      base: "",
      variant: {
        default: "",
        underline: "",
        pills: "",
        fullWidth: "",
      },
    },
    tabpanel: "py-3",
  },
});
