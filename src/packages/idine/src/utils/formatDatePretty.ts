export default (dateInput: string | number | Date): string => {
  let date: Date;

  if (typeof dateInput === "string" || typeof dateInput === "number") {
    date = new Date(dateInput);
  } else {
    date = dateInput;
  }

  // If date is invalid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
};
