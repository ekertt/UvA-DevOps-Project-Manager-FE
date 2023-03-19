import type {FC} from "react";
import React, {useState} from "react";
import "antd/dist/reset.css";
import "./App.css";
import ScrumBoardDashboard from "./views/ScrumBoardDashboard";
import {Login} from "./views/Login";
import authContext from "./auth/auth-context";
import {SignInUserSession} from "./models/sign-in-user-session";

const App: FC = () => {
	const [user, setUser] = useState<SignInUserSession | undefined>(undefined);

	return <div className="App">
		<authContext.Provider value={{user, setUser}}>
			{!user ? <Login/> : <ScrumBoardDashboard/>}
		</authContext.Provider>
	</div>
}

export default App;
