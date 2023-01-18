export const getF4FId = (f4f: string[][]) => {
  const a = f4f[0];
  const b = f4f[1];
  return a.filter((item: string) => b.includes(item));
};
