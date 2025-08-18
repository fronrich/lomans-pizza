/**
 * returns an array of individual values created from an enum
 */
export default (e: object) => {
  return Object.keys(e)
    .filter((item) => {
      return !isNaN(Number(item));
    })
    .map((value) => parseInt(value));
};
