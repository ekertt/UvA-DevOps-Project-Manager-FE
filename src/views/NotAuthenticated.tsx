import { Button, Divider, Layout, Space, Typography } from 'antd';
import React, { FC, useContext, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { LoginOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import authContext from '../auth/auth-context';
import { SignInUserSession } from '../models/sign-in-user-session';
import { ReactComponent as LandingPageSVG } from '../assets/not-authenticated.svg';
import { TitleComponent } from './TitleComponent';

const { Title } = Typography;

export const NotAuthenticated: FC = () => {
  const { setUser } = useContext(authContext);

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
      <TitleComponent />
      <div
        style={{
          backgroundColor: '#8BC6EC',
          backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
          height: '100vh',
        }}
      >
        <ProCard
          direction="column"
          ghost
          layout="center"
          style={{ height: '100%' }}
        >
          <ProCard direction="row" bordered colSpan={8}>
            <ProCard
              ghost
              layout="center"
              colSpan={9}
              style={{ height: '100%' }}
            >
              <LandingPageSVG />
            </ProCard>
            <Divider type="vertical" />
            <ProCard>
              <Title>Welcome to SprintVision</Title>
              <Title level={4}>
                The ultimate online scrum board with AI category recognition
                built-in.
              </Title>
              <p style={{ marginBottom: 20, paddingTop: 15 }}>
                Sign up now to streamline your team's workflow and improve
                productivity. With SprintVision, you can easily manage tasks,
                track progress, and categorize work items with just a few
                clicks. Our powerful AI technology takes care of categorization,
                leaving you more time to focus on what really matters -
                delivering your project on time and within budget.
              </p>
              <Space>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => Auth.federatedSignIn()}
                >
                  <LoginOutlined />
                  Create an account
                </Button>
                <Button type="link" onClick={() => Auth.federatedSignIn()}>
                  or login
                </Button>
              </Space>
            </ProCard>
          </ProCard>
        </ProCard>
      </div>
    </>
  );
};
