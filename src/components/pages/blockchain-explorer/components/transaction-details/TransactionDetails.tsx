import { FC } from 'react';
import { Transaction } from '../../types';
import { NUM_FOR_CONVERT_AMOUNT } from '../../constants';
import classNames from 'classnames';

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
    <div
      className={classNames(
        'bg-white rounded-md shadow-md p-6 w-full',
        classname
      )}
    >
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-lg">Детали транзакции</h2>
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
      <div className="border-b border-gray-300 mb-4 pb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Хэш транзакции</span>
          <span className="text-gray-700 font-semibold break-all">{hash}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Сумма</span>
          <span className="text-gray-700 font-semibold">
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
                <img
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  alt="Sender Avatar"
                  className="rounded-full w-6 h-6 mr-2"
                />
                <span className="font-semibold">Неизвестен</span>
              </div>
              <div
                className={classNames(
                  'text-gray-700 break-all mt-1 p-2 rounded-lg',
                  item.prev_out.addr === address && 'bg-blue-500 text-white'
                )}
              >
                <div>
                  Адрес кошелька:{' '}
                  <span
                    className="hover:underline cursor-pointer"
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
                <img
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                  alt="Sender Avatar"
                  className="rounded-full w-6 h-6 mr-2"
                />
                <span className="font-semibold">Неизвестен</span>
              </div>
              <div
                className={classNames(
                  'text-gray-700 break-all mt-1 p-2 rounded-lg',
                  item.addr === address && 'bg-blue-500 text-white'
                )}
              >
                <div>
                  Адрес кошелька:{' '}
                  <span
                    className="hover:underline cursor-pointer"
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
