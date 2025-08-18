export default (name: string) => {
  const names: string[] = name.trim().split(" ");
  return `${names[0][0] ?? ""}${names[names.length - 1][0] ?? ""}`;
};
