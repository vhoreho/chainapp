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
    },
    MUTATION: {
      CHANGE_ROLE: "UsersChangeRole",
    },
  },
  EXPLORER: {
    MUTATION: {
      GET_TRANSACTION: "GetTransactionsForExplorer",
      GET_CURRENCY_IN_USD: "GetCurrencyInUSD",
    },
  },
  COINS_STAT: {
    QUERY: {
      GET_COINS: "GetCoins",
      GET_COIN: "GetCoin",
    },
  },
};
