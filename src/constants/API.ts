const ETHEREUM_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const CRYPTO_COMPARE_KEY = process.env.NEXT_PUBLIC_CRYPTO_COMPARE_API_KEY;

export const BASE_API_URL = "https://chainapp-backend-ed11080370d9.herokuapp.com";
export const BITCOIN_EXPLORER_API_URL = "https://blockchain.info/rawaddr";
export const ETHEREUM_EXPLORER_API_URL = "https://api.etherscan.io/api";
export const COIN_STATS_API_BASE_URL = "https://openapiv1.coinstats.app";
// export const BASE_API_URL = "http://localhost:3333";

//Auth API Routes
export const REGISTER_ROUTE = `${BASE_API_URL}/auth/register`;
export const AUTHORIZATION_ROUTE = `${BASE_API_URL}/auth/login`;

//BlockChain API Routes
export const GET_BLOCKCHAIN_ROUTE = `${BASE_API_URL}/blockchain`;
export const GET_UNSIGNED_TRANSACTIONS = `${BASE_API_URL}/blockchain/get-unsigned-transactions`;
export const GET_TRANSACTIONS_FOR_MINING = `${BASE_API_URL}/blockchain/get-transaction-for-mining`;
export const GET_SIGNED_TRANSACTIONS = `${BASE_API_URL}/blockchain/get-signed-transactions`;
export const CREATE_BLOCK_ROUTE = `${BASE_API_URL}/blockchain/create`;
export const CLEAR_BLOCKCHAIN_ROUTE = `${BASE_API_URL}/blockchain/clear`;
export const MINE_BLOCK_ROUTE = (id: number) => `${BASE_API_URL}/blockchain/mine/${id}`;
export const SIGN_BLOCK_ROUTE = (id: number) => `${BASE_API_URL}/blockchain/sign-transaction/${id}`;
export const DELETE_USNIGNED_TRANSACTION_BY_ID = (id: number) =>
  `${BASE_API_URL}/blockchain/delete-unsigned-transaction/${id}`;

//Materials API Routes
export const BASE_MATERIAL_ROUTE = `${BASE_API_URL}/materials`;

//Users API Routes
export const GET_USERS_ROUTE = `${BASE_API_URL}/users`;
export const UPDATE_ROLE_ROUTE = `${BASE_API_URL}/users/change-role`;
export const UPDATE_PROFILE_BY_ID_ROUTE = (id: number) =>
  `${BASE_API_URL}/users/update-profile/${id}`;
export const APPROVE_UPDATE_ROLE_BY_ID_ROUTE = (id: number) =>
  `${BASE_API_URL}/users/approve-change-role/${id}`;
export const REJECT_UPDATE_ROLE_BY_ID_ROUTE = (id: number) =>
  `${BASE_API_URL}/users/reject-change-role/${id}`;
export const DELETE_USER_ROUTE = (id: number) => `${BASE_API_URL}/users/delete/${id}`;
export const GENERATE_KEYS_ROUTE = `${BASE_API_URL}/users/generate-keys`;
export const CREATE_USER_ROUTE = `${BASE_API_URL}/users/create-user`;
export const GET_WALLETS = `${BASE_API_URL}/users/get-wallets`;

// Profile
export const GET_PROFILE_ROUTE = `${BASE_API_URL}/profile`;

//Wallet Reputation Routes
export const GET_CRIME_TYPES_ROUTE = `${BASE_API_URL}/wallet-report/crimes`;
export const CRIME_REPORT_ROUTE = `${BASE_API_URL}/wallet-report`;

//Explorer API
export const GET_TRANSACTIONS_BY_ADDRESS = (address: string) =>
  `${BITCOIN_EXPLORER_API_URL}/${address}?cors=false`;
export const GET_CURRENCY_IN_USD = `https://api.coindesk.com/v1/bpi/currentprice.json`;
export const GET_ETHEREUM_IN_USD = `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${CRYPTO_COMPARE_KEY}`;
export const GET_ETHEREUM_TRANSACTIONS = (address: string) =>
  `${ETHEREUM_EXPLORER_API_URL}?module=account&action=txlist&address=${address}&apikey=${ETHEREUM_API_KEY}`;

//Coins Stat API
export const GET_COINS = (page: number = 1, limit: number = 20, currency: string = "USD") =>
  `${COIN_STATS_API_BASE_URL}/coins?page=${page}&limit=${limit}&currency=${currency}`;

export const GET_COIN = (id: string) => `https://openapiv1.coinstats.app/coins/${id}`;
