export const AUTHORIZATION_ERRORS = {
  LOGIN: {
    USER_NOT_FOUND: 'authorization.login.user-not-found',
    WRONG_PASSWORD: 'authorization.login.wrong-password',
  },
  SIGN_UP: {
    USER_ALREADY_TAKEN: 'authorization.sign-up.user-already-taken',
    EMAIL_ALREADY_TAKEN: 'authorization.sign-up.email-is-already-registered',
    FAILED_REGISTER: 'authorization.sign-up.failed-registered-user',
  },
};

export const USERS_ERRORS = {
  USER_HAS_NOT_PUBLIC_KEY: 'user.public-key.user-has-not-public-key',
  USER_NOT_FOUND: 'user.user-not-found',
  WRONG_ROLE: 'user.wrong-role',
};

export const BLOCKCHAIN_ERRORS = {
  TRANSACTION_NOT_FOUND: 'blockchain.transaction.not-found',
  TRANSACTION_HAS_NOT_HASH: 'blockchain.transaction.has-not-hash',
  WRONG_PRIVATE_KEY: 'blockchain.transaction.wrong-private-key',
};
