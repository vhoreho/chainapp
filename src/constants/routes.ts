import { BASE_API_URL } from "./API";

export const ROUTES = {
  AUTH: "/",
  HOME: "/home",
  DASHBOARD: "/dashboard",
  BLOCKCHAIN: "/blockchain",
  BLOCKCHAIN_DASHBOARD: "/blockchain/dashboard",
  BLOCKCHAIN_DOCS: "/blockchain-docs",
  BLOCKCHAIN_EXPLORER: {
    INDEX: "/blockchain-explorer",
    BITCOIN: "/blockchain-explorer/bitcoin",
    ETHERIUM: "/blockchain-explorer/etherium",
  },
  BLOCKCHAIN_REPUTATION: "/blockchain-reputation",
  BLOCKCHAIN_ANALYSER: "/blockchain-analyser",
  DOCS: {
    INDEX: "/docs",
    WHAT_IS_BLOCKCHAIN: "/what-is-blockchain",
    SECTORS: "/sectors",
    FEATURES: "/features",
    COMPONENTS: "/components",
    STEPS: "/steps",
  },
  ADMIN: {
    USER_MANAGEMENT: "/admin/user-management",
  },
};

export const CREATE_CHAIN_PATH = `${BASE_API_URL}/chain/create`;
