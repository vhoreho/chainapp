import {FunctionComponent} from 'react';

type WalletInfoProps = {
  walletData: Record<string, { totalValue: number; count: number }>;
};

const WalletInfo: FunctionComponent<WalletInfoProps> = ({ walletData }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">
        Информация о кошельках
      </h1>
      <ul className="list-disc pl-6">
        {Object.entries(walletData).map(([address, data]) => (
          <li key={address} className="mb-2">
            <div className="font-bold text-teal-600">{address}</div>
            <div className="text-gray-600">Total Value: {data.totalValue}</div>
            <div className="text-gray-600">Count: {data.count}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletInfo;
