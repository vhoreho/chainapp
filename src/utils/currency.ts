import { Coin } from "@/api/coins";

export function getTopGainersLastWeek(cryptocurrencies: Coin[]): Coin[] {
  // Фильтруем криптовалюты, оставляя только те, у которых изменение цены за последнюю неделю положительное
  const gainersLastWeek = cryptocurrencies.filter((crypto) => crypto.priceChange1w > 0);

  // Сортируем криптовалюты по убыванию изменения цены за последнюю неделю
  gainersLastWeek.sort((a, b) => b.priceChange1w - a.priceChange1w);

  // Возвращаем топ 5 криптовалют
  return gainersLastWeek.slice(0, 5);
}

export function getTopLosersLastWeek(cryptocurrencies: Coin[]): Coin[] {
  // Фильтруем криптовалюты, оставляя только те, у которых изменение цены за последнюю неделю отрицательное
  const losersLastWeek = cryptocurrencies.filter((crypto) => crypto.priceChange1w < 0);

  // Сортируем криптовалюты по возрастанию изменения цены за последнюю неделю
  losersLastWeek.sort((a, b) => a.priceChange1w - b.priceChange1w);

  // Возвращаем топ 5 криптовалют
  return losersLastWeek.slice(0, 5);
}
