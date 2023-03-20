import type { FC } from 'react';
import React, { useState } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { Login } from './views/Login';
import authContext from './auth/auth-context';
import { SignInUserSession } from './models/sign-in-user-session';
import { Projects } from './views/Projects';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrumBoardDashboard from './views/ScrumBoardDashboard';

const App: FC = () => {
  const [user, setUser] = useState<SignInUserSession | undefined>(undefined);

  return (
    <div className="App">
      <authContext.Provider value={{ user, setUser }}>
        {!user ? (
          <Login />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={Projects} />
              <Route
                path="/projects/:project_id"
                Component={ScrumBoardDashboard}
              />
            </Routes>
          </BrowserRouter>
        )}
      </authContext.Provider>
    </div>
  );
};

export default App;
