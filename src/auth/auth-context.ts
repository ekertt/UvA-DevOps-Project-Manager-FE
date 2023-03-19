import {createContext} from "react";
import {SignInUserSession} from "../models/sign-in-user-session";

interface AuthContext {
	user?: SignInUserSession;
	setUser: (user?: SignInUserSession) => void;
}

const authContext = createContext<AuthContext>({
	setUser: (auth) => {}
});

export default authContext;
