const envFieldsNames = {
  postges: {
    HOST: 'POSTGRES_HOST',
    PORT: 'POSTGRES_PORT',
    USER: 'POSTGRES_USER',
    PASSWORD: 'POSTGRES_PASSWORD',
    DATABASE: 'POSTGRES_DB',
  },
  jwt: {
    SECRET: 'JWT_SECRET',
    EXP: 'JWT_EXP',
  },
  localAuth: {
    USERNAME_FIELD: 'LOCAL_AUTH_USERNAME_FIELD',
    PASSWORD_FIELD: 'LOCAL_AUTH_PASSWORD_FIELD',
  },
};

export default envFieldsNames;
