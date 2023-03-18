import {FC, useEffect, useState} from "react";
import {Amplify, Auth, Hub} from "aws-amplify";

import awsconfig from './awsconfig.json';
import awsauth from './awsauth.json';
import {Button} from "antd";

Amplify.configure(awsconfig);
Auth.configure({ oauth: awsauth });

export const Autha: FC = () => {
	const [user, setUser] = useState<{username: string} | undefined>(undefined);

		useEffect(() => {
			const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
				switch (event) {
					case "signIn":
						setUser(data);
						break;
					case "signOut":
						setUser(undefined);
						break;
					default:
						break;
				}

				console.log(data);
			});

			Auth.currentAuthenticatedUser()
				.then(currentUser => setUser(currentUser))
				.catch(() => console.log("Not signed in"));

			return unsubscribe;
		}, []);

	return (<>
		<Button type={"primary"} onClick={() => Auth.federatedSignIn()}>Sign in/Up</Button>
		<Button type={"primary"} onClick={() => Auth.signOut()}>Sign out</Button>
		<div>{user && user?.username}</div>
	</>)
}
