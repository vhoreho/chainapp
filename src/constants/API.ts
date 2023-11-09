export const KEY = '1aKcZP8pHLa1XwuIfwOTjKeijZ0zWMl0LpUFxoSK';
export const CRYPTO_API_KEY = 'c78ab0934b3063ccfb71da2f71d700a6a3f4a8ee';
export const ABUSE_KEY = 'q9AcAGfA1VPW8udL0guO6Bt4NYRAG2f7vlPCj8KH';

export const BASE_API_URL = 'http://chainapp-uh-c9c2ecac19f5.herokuapp.com';
// export const BASE_API_URL = 'http://localhost:3333';

//Auth API Routes
export const REGISTER_ROUTE = `${BASE_API_URL}/auth/register`;
export const AUTHORIZATION_ROUTE = `${BASE_API_URL}/auth/login`;

//BlockChain API Routes
export const GET_BLOCKCHAIN_ROUTE = `${BASE_API_URL}/blockchain`;
export const CREATE_BLOCK_ROUTE = `${BASE_API_URL}/blockchain/create`;
export const CLEAR_BLOCKCHAIN_ROUTE = `${BASE_API_URL}/blockchain/clear`;
export const MINER_BLOCK_ROUTE = (id: number) =>
  `${BASE_API_URL}/blockchain/mine/${id}`;

//Users API Routes
export const GET_USERS_ROUTE = `${BASE_API_URL}/users`;
export const UPDATE_ROLE_BY_ID_ROUTE = (id: number) =>
  `${BASE_API_URL}/users/change-role/${id}`;
export const UPDATE_PROFILE_BY_ID_ROUTE = (id: number) =>
  `${BASE_API_URL}/users/update-profile/${id}`;
export const APPROVE_UPDATE_ROLE_BY_ID_ROUTE = (id: number) =>
  `${BASE_API_URL}/users/approve-change-role/${id}`;
export const REJECT_UPDATE_ROLE_BY_ID_ROUTE = (id: number) =>
  `${BASE_API_URL}/users/reject-change-role/${id}`;
  export const DELETE_USER_ROUTE = (id: number) =>
    `${BASE_API_URL}/users/delete/${id}`;;

//Wallet Reputation Routes

export const GET_CRIME_TYPES_ROUTE = `${BASE_API_URL}/wallet-report/crimes`;
export const CRIME_REPORT_ROUTE = `${BASE_API_URL}/wallet-report`;
