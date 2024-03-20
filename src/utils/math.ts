export const generateMathExample = () => {
  const operations = ["+", "-", "*"];
  const selectedOperation = operations[Math.floor(Math.random() * operations.length)];

  let number1, number2, result;

  switch (selectedOperation) {
    case "+":
      number1 = Math.floor(Math.random() * 100) + 1;
      number2 = Math.floor(Math.random() * 100) + 1;
      result = number1 + number2;
      break;
    case "-":
      number1 = Math.floor(Math.random() * 100) + 1;
      number2 = Math.floor(Math.random() * number1);
      result = number1 - number2;
      break;
    case "*":
      number1 = Math.floor(Math.random() * 10) + 1;
      number2 = Math.floor(Math.random() * 10) + 1;
      result = number1 * number2;
      break;
    default:
      break;
  }

  // Ensure the correct result is greater than 0
  if (result && result <= 0) {
    result += Math.floor(Math.random() * 10) + 1;
  }

  return { number1, number2, selectedOperation, result };
};
