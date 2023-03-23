/**
 * A React functional component that handles user authentication using AWS Amplify and Cognito.
 */
import React, { FC, useContext, useEffect } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';

import { cognitoAuthConfig } from '../awsauth';
import { Button } from 'antd';
import authContext from '../auth/auth-context';
import { SignInUserSessionModel } from '../models/sign-in-user-session-model';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { awsConfig } from '../awsconfig';

// Configure Amplify with the AWS configuration object
Amplify.configure(awsConfig);
// Configure Auth with the Cognito authentication configuration object
Auth.configure({ oauth: cognitoAuthConfig });

/**
 * The AuthenticationComponent is a functional component that handles user authentication using AWS Amplify and Cognito.
 *
 * @returns {JSX.Element} - A React JSX element.
 */
export const AuthenticationComponent: FC = () => {
  const { user, setUser } = useContext(authContext);

  useEffect(
    () =>
      Hub.listen('auth', ({ payload: { event, data } }) => {
        switch (event) {
          case 'signIn':
            setUser(data.signInUserSession as SignInUserSessionModel);
            break;
          case 'signOut':
            setUser(undefined);
            break;
          default:
            break;
        }
      }),
    [setUser]
  );

  /**
   * Render a login or logout button depending on the current user state.
   *
   * @returns {JSX.Element} - A React JSX element.
   */
  return (
    <>
      <div style={{ textAlign: 'right' }}>
        {!user ? (
          <Button type="primary" onClick={() => Auth.federatedSignIn()}>
            <LoginOutlined />
            Sign in/Up
          </Button>
        ) : (
          <Button type="primary" onClick={() => Auth.signOut()}>
            <LogoutOutlined />
            Sign out
          </Button>
        )}
      </div>
    </>
  );
};
