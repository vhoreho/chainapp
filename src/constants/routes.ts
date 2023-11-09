import { BASE_API_URL } from './API';

export const ROUTES = {
  AUTH: '/',
  HOME: '/home',
  BLOCKCHAIN: '/blockchain',
  BLOCKCHAIN_DOCS: '/blockchain-docs',
  BLOCKCHAIN_EXPLORER: '/blockchain-explorer',
  BLOCKCHAIN_REPUTATION: '/blockchain-reputation',
  BLOCKCHAIN_ANALYSER: '/blockchain-analyser',
  DOCS: {
    INDEX: '/docs',
    WHAT_IS_BLOCKCHAIN: '/what-is-blockchain',
    SECTORS: '/sectors',
    FEATURES: '/features',
    COMPONENTS: '/components',
    STEPS: '/steps',
  },
};

export const CREATE_CHAIN_PATH = `${BASE_API_URL}/chain/create`;
