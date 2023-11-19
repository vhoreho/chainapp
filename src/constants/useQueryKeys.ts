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
    },
    QUERY: {
      GET: "BlockchainGet",
    },
  },
};
