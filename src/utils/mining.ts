export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateRandomOperator = (): string => {
  const operators = ["+", "-", "*", "/"];
  const randomIndex = Math.floor(Math.random() * operators.length);
  return operators[randomIndex];
};
