export const pxToNumber = (value: string) => {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
};
