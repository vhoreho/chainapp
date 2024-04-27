import { Coin } from "@/api/coins";

export function getTopGainersLastWeek(cryptocurrencies: Coin[]): Coin[] {
  // Фильтруем криптовалюты, оставляя только те, у которых изменение цены за последнюю неделю положительное
  const gainersLastWeek = cryptocurrencies.filter(
    (crypto) => crypto.price > 0.01 && crypto.priceChange1w > 0,
  );

  // Сортируем криптовалюты по убыванию изменения цены за последнюю неделю
  gainersLastWeek.sort((a, b) => b.priceChange1w - a.priceChange1w);

  // Возвращаем топ 5 криптовалют
  return gainersLastWeek.slice(0, 5);
}

export function getTopLosersLastWeek(cryptocurrencies: Coin[]): Coin[] {
  // Фильтруем криптовалюты, оставляя только те, у которых изменение цены за последнюю неделю отрицательное
  const losersLastWeek = cryptocurrencies.filter(
    (crypto) => crypto.price > 0.01 && crypto.priceChange1w < 0,
  );

  // Сортируем криптовалюты по возрастанию изменения цены за последнюю неделю
  losersLastWeek.sort((a, b) => a.priceChange1w - b.priceChange1w);

  // Возвращаем топ 5 криптовалют
  return losersLastWeek.slice(0, 5);
}

export function formatPrice(number: number, btcPrice: number) {
  // Calculate the total price by multiplying the number by the Bitcoin price
  const totalPrice = number * btcPrice;

  // Format the total price with two decimal places and a dollar sign
  const formattedPrice = parseFloat(totalPrice.toFixed(2)).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formattedPrice;
}

export function satoshiToDollars(satoshiAmount: number, dollarPricePerBitcoin: number): string {
  const satoshiPerBitcoin = 100000000;
  const dollarAmount = (satoshiAmount * dollarPricePerBitcoin) / satoshiPerBitcoin;
  return dollarAmount.toFixed(2);
}

export function numberToFormattedString(number: number): string {
  if (number < 1000) {
    return number.toString();
  } else {
    // Divide by 1000 and format with one decimal place
    const formattedNumber = (number / 1000).toFixed(1);
    // Add the "K" suffix
    return formattedNumber + "K";
  }
}

export function getGasFeeInGwei(gasUsed: string, gasPrice: string): number {
  // Convert gasUsed and gasPrice from strings to numbers
  const gUsed = parseInt(gasUsed, 10);
  const gPrice = parseInt(gasPrice, 10);

  // Calculate gas fee in Gwei
  const gasFee = gUsed * gPrice;

  return gasFee;
}

export function weiToEth(weiValue: number): number {
  return weiValue / Math.pow(10, 18);
}

export function gweiToDollars(gweiValue: number, ethPriceUsd: number): number {
  // Convert Gwei to Ether (ETH)
  const ethValue = gweiValue / Math.pow(10, 9);

  // Convert Ether (ETH) to USD
  const usdValue = ethValue * ethPriceUsd;

  return usdValue;
}

export function convertToThousandAndDecimal(value: number) {
  const thousand = Math.floor(value / Math.pow(10, 15));
  const decimal = (value % Math.pow(10, 15)) / Math.pow(10, 15);
  return `${thousand}.${decimal}`;
}
