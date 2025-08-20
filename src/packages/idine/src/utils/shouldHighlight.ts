import Diet from "../enums/Diet";

export default (diets: Diet[], highlight: Diet[]) => {
  for (const diet of diets) {
    if (highlight.map((diet) => Number(diet)).includes(Number(diet))) {
      return true;
    }
  }
  return false;
};
