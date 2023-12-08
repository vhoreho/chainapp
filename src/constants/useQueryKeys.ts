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
};
