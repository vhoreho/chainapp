export const KEY = "1aKcZP8pHLa1XwuIfwOTjKeijZ0zWMl0LpUFxoSK";
export const CRYPTO_API_KEY = "c78ab0934b3063ccfb71da2f71d700a6a3f4a8ee";
export const ABUSE_KEY = "q9AcAGfA1VPW8udL0guO6Bt4NYRAG2f7vlPCj8KH";

export const BASE_API_URL = "https://chainapp-uh-c9c2ecac19f5.herokuapp.com";
export const EXPLORER_API_URL = "https://blockchain.info/rawaddr";
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

// Profile
export const GET_PROFILE_ROUTE = `${BASE_API_URL}/profile`;

//Wallet Reputation Routes
export const GET_CRIME_TYPES_ROUTE = `${BASE_API_URL}/wallet-report/crimes`;
export const CRIME_REPORT_ROUTE = `${BASE_API_URL}/wallet-report`;

//Explorer API
export const GET_TRANSACTIONS_BY_ADDRESS = (address: string) => `${EXPLORER_API_URL}/${address}`;
export const GET_CURRENCY_IN_USD = `https://api.coindesk.com/v1/bpi/currentprice.json`;
