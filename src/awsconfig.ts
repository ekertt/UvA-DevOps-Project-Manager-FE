interface AuthConfig {
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
  mandatorySignIn: boolean;
  cookieStorage: {
    domain: string;
    path: string;
    expires: number;
    secure: boolean;
  };
  redirectSignIn: string;
  redirectSignOut: string;
}

interface ApiConfig {
  endpoints: {
    name: string;
    endpoint: string;
  }[];
}

interface AppConfig {
  Auth: AuthConfig;
  API: ApiConfig;
}

export const awsConfig: AppConfig = {
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_EvjxRSWkg',
    userPoolWebClientId: '63pt4gqlvh725e9592209phluk',
    mandatorySignIn: false,
    cookieStorage: {
      domain: 'localhost',
      path: '/',
      expires: 365,
      secure: true,
    },
    redirectSignIn:
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BASE_URL_PROD!
        : process.env.REACT_APP_BASE_URL_DEV!,
    redirectSignOut:
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BASE_URL_PROD!
        : process.env.REACT_APP_BASE_URL_DEV!,
  },
  API: {
    endpoints: [
      {
        name: 'demo',
        endpoint:
          process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BASE_URL_PROD!
            : process.env.REACT_APP_BASE_URL_DEV!,
      },
    ],
  },
};
