import type { FC } from 'react';
import React, { useState } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { Login } from './views/Login';
import authContext from './auth/auth-context';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { SignInUserSession } from './models/sign-in-user-session';
import { Projects } from './views/Projects';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tasks from './views/Tasks';
import {
  Avatar,
  Col,
  Layout,
  Menu,
  Row,
  Typography,
  Button,
  Space,
} from 'antd';
import { NotAuthenticated } from './views/NotAuthenticated';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const App: FC = () => {
  const [user, setUser] = useState<SignInUserSession | undefined>(undefined);

  const parseNameFirstLetter = (user: SignInUserSession): string => {
    return user.idToken.payload.given_name.charAt(0) || '';
  };

  const parseName = (user: SignInUserSession): string => {
    const name = user.idToken.payload.given_name;
    const familyName = user.idToken.payload.family_name;

    return `${name} ${familyName}`;
  };

  return (
    <authContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Layout
          className="layout"
          style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #434343, #0B6FB8)',
          }}
        >
          {!user ? (
            <Login />
          ) : (
            <>
              <Header
                style={{ background: 'transparent', padding: '10px 16px' }}
              >
                <Space
                  direction="horizontal"
                  size="large"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 24px',
                    marginBottom: '-50px',
                    marginTop: '10px',
                    width: '100%',
                  }}
                >
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
                  </Row>
                </Space>
                <Space
                  direction="vertical"
                  style={{ width: '100%', justifyContent: 'right' }}
                >
                  <Row
                    gutter={[48, 4]}
                    style={{
                      display: 'grid',
                      zIndex: 2,
                      justifyContent: 'end',
                      alignContent: 'baseline',
                    }}
                  >
                    <Col
                      offset={2}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'relative',
                        right: '150px',
                        bottom: '19px',
                        alignItems: 'center',
                      }}
                    >
                      {user && (
                        <div style={{ color: '#fff' }}>
                          <Avatar
                            style={{
                              backgroundColor: '#fde3cf',
                              marginRight: '16px',
                            }}
                          >
                            {parseNameFirstLetter(user)}
                          </Avatar>
                          <span>{parseName(user)}</span>
                        </div>
                      )}
                    </Col>
                    <Col
                      offset={6}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '10px',
                      }}
                    >
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
                    </Col>
                  </Row>
                </Space>
              </Header>
              <Content
                style={{ padding: '0 50px', marginTop: '50px', bottom: 0 }}
              >
                <BrowserRouter>
                  <Routes>
                    <Route path="/" Component={Projects} />
                    <Route path="/projects/:project_id" Component={Tasks} />
                  </Routes>
                </BrowserRouter>
              </Content>
            </>
          )}
        </Layout>
      </div>
    </authContext.Provider>
  );
};

export default App;
