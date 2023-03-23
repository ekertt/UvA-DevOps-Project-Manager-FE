/**
 * A module that exports an AuthContext object.
 */
import { createContext } from 'react';
import { SignInUserSessionModel } from '../models/sign-in-user-session-model';

/**
 * An interface that defines the shape of the AuthContext object.
 */
interface AuthContext {
  user?: SignInUserSessionModel;
  setUser: (user?: SignInUserSessionModel) => void;
}

/**
 * The AuthContext object created.
 */
const authContext = createContext<AuthContext>({
  setUser: (auth) => {},
});

export default authContext;
