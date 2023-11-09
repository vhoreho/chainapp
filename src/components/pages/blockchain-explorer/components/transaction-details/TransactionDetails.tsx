import { FC } from 'react';
import Image from "next/image";
import classNames from "classnames";
import { NUM_FOR_CONVERT_AMOUNT } from "../../constants";
import { Transaction } from "../../types";

export const TransactionDetails: FC<
  Transaction & {
    address: string;
    usdPrice: number;
    classname: string;
    onChangeAddress: (key: string) => void;
  }
> = ({
  amount,
  hash,
  amountInUSD,
  from,
  time,
  to,
  address,
  usdPrice,
  classname,
  onChangeAddress,
}) => {
  return (
    <div className={classNames("bg-white rounded-md shadow-md p-6 w-full", classname)}>
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-bold">Детали транзакции</h2>
        {/* <span className="text-gray-500">{`${new Date(
          time * 1000
        ).toLocaleString('ru', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}`}</span> */}
        <span>{time}</span>
      </div>
      <div className="mb-4 border-b border-gray-300 pb-4">
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">Хэш транзакции</span>
          <span className="break-all font-semibold text-gray-700">{hash}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Сумма</span>
          <span className="font-semibold text-gray-700">
            {(amount * NUM_FOR_CONVERT_AMOUNT).toFixed(8)} BTC (
            {amountInUSD && `$${amountInUSD.toFixed(2)}`})
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm">
          <span className="text-gray-500">Отправитель</span>
          {from.map((item) => (
            <>
              <div className="mt-3 flex items-center">
                <Image
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  alt="Sender Avatar"
                  className="mr-2 h-6 w-6 rounded-full"
                  width={24}
                  height={24}
                />
                <span className="font-semibold">Неизвестен</span>
              </div>
              <div
                className={classNames(
                  "text-gray-700 break-all mt-1 p-2 rounded-lg",
                  item.prev_out.addr === address && "bg-blue-500 text-white",
                )}
              >
                <div>
                  Адрес кошелька:{" "}
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => onChangeAddress(item.prev_out.addr)}
                  >
                    {item.prev_out.addr}
                  </span>
                </div>
                <div>
                  Сумма:
                  {(item.prev_out.value * NUM_FOR_CONVERT_AMOUNT).toFixed(8)}(
                  {`$${((item.prev_out.value / 1e8) * usdPrice).toFixed(2)}`})
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Адресат</span>
          {to.map((item) => (
            <>
              <div className="mt-3 flex items-center">
                <Image
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  alt="Sender Avatar"
                  className="mr-2 h-6 w-6 rounded-full"
                  width={24}
                  height={24}
                />
                <span className="font-semibold">Неизвестен</span>
              </div>
              <div
                className={classNames(
                  "text-gray-700 break-all mt-1 p-2 rounded-lg",
                  item.addr === address && "bg-blue-500 text-white",
                )}
              >
                <div>
                  Адрес кошелька:{" "}
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => onChangeAddress(item.addr)}
                  >
                    {item.addr}
                  </span>
                </div>
                <div>
                  Сумма:
                  {(item.value * NUM_FOR_CONVERT_AMOUNT).toFixed(8)}(
                  {`$${((item.value / 1e8) * usdPrice).toFixed(2)}`})
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
