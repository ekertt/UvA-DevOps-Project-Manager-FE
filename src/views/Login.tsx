import React, { FC, useContext, useEffect } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';

import awsconfig from '../awsconfig.json';
import awsauth from '../awsauth.json';
import { Button } from 'antd';
import authContext from '../auth/auth-context';
import { SignInUserSession } from '../models/sign-in-user-session';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

Amplify.configure(awsconfig);
Auth.configure({ oauth: awsauth });

export const Login: FC = () => {
  const { user, setUser } = useContext(authContext);

  useEffect(
    () =>
      Hub.listen('auth', ({ payload: { event, data } }) => {
        switch (event) {
          case 'signIn':
            setUser(data.signInUserSession as SignInUserSession);
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
