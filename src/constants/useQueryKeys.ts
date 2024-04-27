export const USE_QUERY_KEYS = {
  AUTHORIZATION: {
    MUTATION: {
      LOG_IN: "AuthorizationLogin",
      SIGN_UP: "AuthorizationSignUp",
    },
  },
  PROFILE: {
    MUTATION: {
      UPDATE: "ProfileUpdate",
    },
    QUERY: {
      GET: "GetProfile",
    },
  },
  BLOCKCHAIN: {
    MUTATION: {
      CREATE: "BlockchainCreateBlock",
      SIGN_TRANSACTION: "SignTransaction",
      DELETE_UNSIGNED_TRANSACTION: "DeleteUnsignedTransaction",
      MINE_BLOCK: "MineBlock",
    },
    QUERY: {
      GET_CREATED_TRANSACTIONS: "GetCreatedTransactions",
      GET_UNSIGNED_TRANSACTIONS: "GetUnsignedTransactions",
      GET_SIGNED_TRANSACTIONS: "GetSignedTransactions",
      GET_TRANSACTIONS_FOR_MINING: "GetTransactionsForMining",
    },
  },
  USERS: {
    QUERY: {
      GENERATE_KEYS: "GenerateKeys",
      GET_USERS: "GetUsers",
      GET_WALLETS: "GetWallets",
    },
    MUTATION: {
      CHANGE_ROLE: "UsersChangeRole",
      CREATE_USER: "UsersCreateUser",
    },
  },
  EXPLORER: {
    MUTATION: {
      GET_TRANSACTION: "GetTransactionsForExplorer",
      GET_ETHEREUM_TRANSACTION: "GetEthereumTransactionsForExplorer",
    },
    QUERY: {
      GET_BTC_CURRENCY_IN_USD: "GetBTCCurrencyInUSD",
      GET_ETH_CURRENCY_IN_USD: "GetETHCurrencyInUSD",
    },
  },
  COINS_STAT: {
    QUERY: {
      GET_COINS: "GetCoinsQuery",
      GET_COIN: "GetCoinQuery",
    },
    MUTATION: {
      GET_COINS: "GetCoinsMutation",
    },
  },
};
