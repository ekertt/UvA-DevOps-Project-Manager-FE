import { createContext } from 'react';
import { SignInUserSessionModel } from '../models/sign-in-user-session-model';

interface AuthContext {
  user?: SignInUserSessionModel;
  setUser: (user?: SignInUserSessionModel) => void;
}

const authContext = createContext<AuthContext>({
  setUser: (auth) => {},
});

export default authContext;
