import { Coin } from "@/api/coins";

export function getTopGainersLastWeek(cryptocurrencies: Coin[]): Coin[] {
  const gainersLastWeek = cryptocurrencies.filter(
    (crypto) => crypto.price > 0.01 && crypto.priceChange1w > 0,
  );

  gainersLastWeek.sort((a, b) => b.priceChange1w - a.priceChange1w);

  return gainersLastWeek.slice(0, 5);
}

export function getTopLosersLastWeek(cryptocurrencies: Coin[]): Coin[] {
  const losersLastWeek = cryptocurrencies.filter(
    (crypto) => crypto.price > 0.01 && crypto.priceChange1w < 0,
  );

  losersLastWeek.sort((a, b) => a.priceChange1w - b.priceChange1w);

  return losersLastWeek.slice(0, 5);
}

export function formatPrice(number: number, btcPrice: number) {
  const totalPrice = number * btcPrice;

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
    const formattedNumber = (number / 1000).toFixed(1);

    return formattedNumber + "K";
  }
}

export function getGasFeeInGwei(gasUsed: string, gasPrice: string): number {
  const gUsed = parseInt(gasUsed, 10);
  const gPrice = parseInt(gasPrice, 10);

  const gasFee = gUsed * gPrice;

  return gasFee;
}

export function weiToEth(weiValue: number): number {
  return weiValue / Math.pow(10, 18);
}

export function gweiToDollars(gweiValue: number, ethPriceUsd: number): number {
  const ethValue = gweiValue / Math.pow(10, 9);

  const usdValue = ethValue * ethPriceUsd;

  return usdValue;
}

export function convertToThousandAndDecimal(value: number) {
  const thousand = Math.floor(value / Math.pow(10, 15));
  const decimal = (value % Math.pow(10, 15)) / Math.pow(10, 15);
  return `${thousand}.${decimal}`;
}
