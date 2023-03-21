import { FC, useContext, useEffect } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';

import awsconfig from '../awsconfig.json';
import awsauth from '../awsauth.json';
import { Button, Layout, Typography, Row, Col, Space, Card } from 'antd';
import authContext from '../auth/auth-context';
import { SignInUserSession } from '../models/sign-in-user-session';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

Amplify.configure(awsconfig);
Auth.configure({ oauth: awsauth });

const { Header, Content } = Layout;
const { Title, Text } = Typography;

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
    <Layout
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #434343, #0B6FB8)',
      }}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ display: 'flex', padding: '0 24px' }}
      >
        <Header style={{ background: 'transparent', padding: '10px 16px' }}>
          <Row
            justify="space-between"
            align="middle"
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Col>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Title
                  level={2}
                  style={{
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontWeight: 'bold',
                    fontSize: '2em',
                    textShadow: '2px 2px 0px #333',
                    transform: 'skew(-10deg)',
                    marginRight: '20px',
                  }}
                >
                  SPRINTVISION
                  <span
                    style={{
                      marginLeft: '-5px',
                      textShadow: '2px 2px 0px #333',
                    }}
                  />
                </Title>
              </div>
            </Col>
            <Col
              span={15}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <div>
                {' '}
                {!user ? (
                  <Button
                    type="primary"
                    size="small"
                    style={{
                      background: '#1C415E',
                      borderColor: '#1C415E',
                      fontWeight: 600,
                      borderRadius: '8px',
                    }}
                    onClick={() => Auth.federatedSignIn()}
                  >
                    <LoginOutlined />
                    Sign In / Sign Up
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="small"
                    style={{
                      background: '#1C415E',
                      borderColor: '#1C415E',
                      fontWeight: 600,
                      borderRadius: '8px',
                    }}
                    onClick={() => Auth.signOut()}
                  >
                    <LogoutOutlined />
                    Sign Out
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Header>
      </Space>
      <Space
        direction="vertical"
        size="large"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <Content style={{ width: '100%', maxWidth: '800px' }}>
          <div
            style={{
              maxWidth: 800,
              margin: '0 auto',
              padding: '150px 50px 50px',
            }}
          >
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
                padding: '32px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Title
                style={{ color: '#1C415E', fontSize: '36px', fontWeight: 600 }}
              >
                Welcome to SprintVision
              </Title>
              <Text
                style={{
                  color: '#1C415E',
                  fontSize: '16px',
                  marginBottom: '32px',
                }}
              >
                The ultimate online scrum board with AI category recognition
                built-in.
              </Text>
              <p style={{ marginBottom: 20, paddingTop: 15 }}>
                Sign up now to streamline your team's workflow and improve
                productivity. With SprintVision, you can easily manage tasks,
                track progress, and categorize work items with just a few
                clicks. Our powerful AI technology takes care of categorization,
                leaving you more time to focus on what really matters -
                delivering your project on time and within budget.
              </p>
              <Button
                type="primary"
                size="large"
                style={{
                  background: '#1C415E',
                  borderColor: '#1C415E',
                  fontWeight: 600,
                  borderRadius: '8px',
                }}
                onClick={() => Auth.federatedSignIn()}
              >
                <LoginOutlined />
                Sign In / Sign Up
              </Button>
            </Card>
          </div>
        </Content>
      </Space>
    </Layout>
  );
};
