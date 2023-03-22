interface CognitoAuthConfig {
  domain: string;
  scope: string[];
  redirectSignIn: string;
  redirectSignOut: string;
  responseType: string;
}

export const cognitoAuthConfig: CognitoAuthConfig = {
  domain: 'dev-tim-project-manager-app.auth.eu-west-1.amazoncognito.com',
  scope: ['email', 'profile', 'openid'],
  redirectSignIn:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BASE_URL_PROD!
      : process.env.REACT_APP_BASE_URL_DEV!,
  redirectSignOut:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BASE_URL_PROD!
      : process.env.REACT_APP_BASE_URL_DEV!,
  responseType: 'code',
};
