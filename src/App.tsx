import type { FC } from 'react';
import React, { useState } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { Login } from './views/Login';
import authContext from './auth/auth-context';
import { SignInUserSession } from './models/sign-in-user-session';
import { Projects } from './views/Projects';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tasks from './views/Tasks';
import { Avatar, Col, Layout, Menu, Row } from 'antd';
import { NotAuthenticated } from './views/NotAuthenticated';
import { TitleComponent } from './views/TitleComponent';

const { Header, Content } = Layout;

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
        <Layout className="layout">
          {!user ? (
            <NotAuthenticated />
          ) : (
            <>
              <Header style={{ backgroundColor: '#e6f4ff' }}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                ></Menu>
                <Row style={{ justifyContent: 'space-between' }}>
                  <Col>
                    {user && (
                      <div>
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
                  <Col style={{ minWidth: '30%' }}>
                    <TitleComponent />
                  </Col>
                  <Col>
                    <Login />
                  </Col>
                </Row>
              </Header>
              <Content>
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
