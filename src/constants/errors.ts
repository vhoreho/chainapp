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
};
