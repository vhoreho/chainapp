import React, { FunctionComponent, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMineBlockMutation } from "@/api/blockchain";
import { Spinner } from "@/components/common";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useSecondaryModal } from "@/hooks/context/useSecondaryModal";
import { generateRandomNumber, generateRandomOperator } from "@/utils/mining";
import CloseIcon from "../../icons/Close";

type Props = {
  id: number;
};

export const MineModal: FunctionComponent<Props> = ({ id }) => {
  const { closeModal } = useSecondaryModal();
  const [mathExample, setMathExample] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mineBlockMutation = useMineBlockMutation();
  const queryClient = useQueryClient();

  const generateRandomExample = (): void => {
    const num1 = generateRandomNumber(1, 100);
    const num2 = generateRandomNumber(1, 100);
    const operator = generateRandomOperator();

    const newMathExample = `${num1} ${operator} ${num2}`;
    setMathExample(newMathExample);
  };

  const checkAnswer = (): void => {
    setError(null);
    setIsLoading(true);
    const [num1, operator, num2] = mathExample.split(" ");
    const correctAnswer = calculateResult(Number(num1), Number(num2), operator);

    if (userAnswer === correctAnswer.toString()) {
      mineBlockMutation.mutateAsync(
        { id, nonce: +userAnswer },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_CREATED_TRANSACTIONS],
            });
            queryClient.invalidateQueries({
              queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_SIGNED_TRANSACTIONS],
            });
            queryClient.invalidateQueries({
              queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_TRANSACTIONS_FOR_MINING],
            });
            setIsLoading(false);
            closeModal();
          },
        },
      );
    } else {
      setError("Ответ не верный. Попробуйте еще");
      generateRandomExample();
      setUserAnswer("");
      setIsLoading(false);
    }
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

  useEffect(() => {
    generateRandomExample();
  }, []);

  return (
    <div className="min-w-[400px] max-w-[760px]">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-semibold">Добыть блок</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>
      <p className="my-4">
        Майнеры играют важную роль в обеспечении безопасности блокчейна, решая математические
        задачи. 🧮 Этот процесс, известный как добыча блока, требует от майнеров решения уникальных
        математических выражений. <br /> 🔍 Формирование задачи: Майнерам предоставляется случайное
        математическое выражение. <br />
        💡 Решение: Майнеры вычисляют результат задачи, например, сложение чисел.
        <br /> 🤔 Проверка ответа: Решение майнера сравнивается с ожидаемым результатом. При верном
        ответе майнер успешно добавляет блок.
        <br /> ❌ Неверный ответ: В случае ошибки майнеру приходится попробовать снова, обеспечивая
        надежность блокчейна.
        <br /> 🔄 Обновление задачи: После успешного решения майнер получает право добавить блок, и
        формируется новая задача для следующего блока. Этот процесс, известный как доказательство
        работы (Proof of Work), обеспечивает безопасность и децентрализацию блокчейна. 🌐💼
      </p>
      <p className="mb-4 font-semibold">Решите пример: {mathExample}</p>
      <input
        type="text"
        className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none"
        placeholder="Введите ответ (при наличии, два знака после запятой)"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button
        className="mr-2 flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-white"
        onClick={checkAnswer}
      >
        {isLoading ? <Spinner size="xs" /> : "Проверить ответ"}
      </button>
      {error && <p className="mt-3 text-center text-red-500">{error}</p>}
    </div>
  );
};
