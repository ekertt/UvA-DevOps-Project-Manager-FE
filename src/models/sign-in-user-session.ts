export interface SignInUserSession {
  idToken: IdToken;
  refreshToken: RefreshToken;
  accessToken: AccessToken;
  clockDrift: number;
}

export interface IdToken {
  jwtToken: string;
  payload: Payload;
}

export interface Payload {
  at_hash: string;
  sub: string;
  email_verified: boolean;
  iss: string;
  'cognito:username': string;
  given_name: string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  exp: number;
  iat: number;
  family_name: string;
  jti: string;
  email: string;
}

export interface RefreshToken {
  token: string;
}

export interface AccessToken {
  jwtToken: string;
  payload: Payload2;
}

export interface Payload2 {
  sub: string;
  iss: string;
  version: number;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
}
