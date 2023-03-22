import React, { FC, useContext, useEffect } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';

import { cognitoAuthConfig } from '../awsauth';
import { Button } from 'antd';
import authContext from '../auth/auth-context';
import { SignInUserSessionModel } from '../models/sign-in-user-session-model';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { awsConfig } from '../awsconfig';

Amplify.configure(awsConfig);
Auth.configure({ oauth: cognitoAuthConfig });

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
