export type GetCoinsReqM = {
  page: number;
  limit: number;
  currency: string;
};

export type Meta = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  limit: number;
  page: number;
  pageCount: number;
};

export type Coin = {
  availableSupply: number;
  explorers: Array<string>;
  icon: string;
  id: string;
  marketCap: number;
  name: string;
  price: number;
  priceBtc: number;
  priceChange1d: number;
  priceChange1h: number;
  priceChange1w: number;
  rank: number;
  redditUrl: string;
  symbol: string;
  totalSupply: number;
  twitterUrl: string;
  volume: number;
  websiteUrl: string;
};

export type GetCoinsResM = {
  meta: Meta;
  result: Array<Coin>;
};
