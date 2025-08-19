import Diet from "../enums/Diet";

export default (diets: Diet[], highlight: Diet[]) => {
  for (const diet of diets) {
    if (highlight.includes(diet)) {
      return true;
    }
  }
  return false;
};
