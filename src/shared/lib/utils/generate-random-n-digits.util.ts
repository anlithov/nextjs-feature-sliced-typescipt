export const generateRandomNDigits = (numberLength: number) => {
  return (
    Math.floor(Math.random() * (9 * Math.pow(10, numberLength - 1))) +
    Math.pow(10, numberLength - 1)
  );
};
