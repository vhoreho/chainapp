import React, { useState } from "react";

export const MiningModal = () => {
  const [mathExample, setMathExample] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string>("");

  const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const generateRandomOperator = (): string => {
    const operators = ["+", "-", "*", "/"];
    const randomIndex = Math.floor(Math.random() * operators.length);
    return operators[randomIndex];
  };

  const generateRandomExample = (): void => {
    const num1 = generateRandomNumber(1, 10);
    const num2 = generateRandomNumber(1, 10);
    const operator = generateRandomOperator();

    const newMathExample = `${num1} ${operator} ${num2}`;
    setMathExample(newMathExample);
  };

  const checkAnswer = (): void => {
    const [num1, operator, num2] = mathExample.split(" ");
    const correctAnswer = calculateResult(Number(num1), Number(num2), operator);

    if (userAnswer === correctAnswer.toString()) {
      alert("Correct!");
    } else {
      alert("Incorrect. Try again.");
    }

    // Генерация нового примера после проверки
    generateRandomExample();
    setUserAnswer(""); // Очистка поля ввода
  };

  const calculateResult = (num1: number, num2: number, operator: string): number => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        return NaN;
    }
  };

  return (
    <div className="min-w-[400px] max-w-[760px] p-4">
      <h1 className="mb-4 text-xl font-bold">Mining Modal</h1>
      <p className="mb-4">Solve: {mathExample}</p>
      <input
        type="text"
        className="mb-4 w-full rounded-md border border-gray-300 p-2"
        placeholder="Your Answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white" onClick={checkAnswer}>
        Check Answer
      </button>
      <button
        className="rounded-md bg-green-500 px-4 py-2 text-white"
        onClick={generateRandomExample}
      >
        Generate New Example
      </button>
    </div>
  );
};
