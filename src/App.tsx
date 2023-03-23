import type { FC } from 'react';
import React, { useState } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { AuthenticationComponent } from './components/authentication-component';
import authContext from './auth/auth-context';
import { SignInUserSessionModel } from './models/sign-in-user-session-model';
import { ProjectsPage } from './views/projects-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TasksPage from './views/tasks-page';
import { Avatar, Col, Layout, Menu, Row } from 'antd';
import { LandingPage } from './views/landing-page';
import { TitleComponent } from './components/title-component';

const { Header, Content } = Layout;

const App: FC = () => {
  const [user, setUser] = useState<SignInUserSessionModel | undefined>(
    undefined
  );

  const parseNameFirstLetter = (user: SignInUserSessionModel): string => {
    return user.idToken.payload.given_name.charAt(0) || '';
  };

  const parseName = (user: SignInUserSessionModel): string => {
    const name = user.idToken.payload.given_name;
    const familyName = user.idToken.payload.family_name;

    return `${name} ${familyName}`;
  };

  return (
    <authContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Layout className="layout">
          {!user ? (
            <LandingPage />
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
                    <AuthenticationComponent />
                  </Col>
                </Row>
              </Header>
              <Content>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" Component={ProjectsPage} />
                    <Route path="/projects/:project_id" Component={TasksPage} />
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
