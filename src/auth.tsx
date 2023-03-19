import React, { FC, useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';

import awsconfig from './awsconfig.json';
import awsauth from './awsauth.json';
import { Button } from 'antd';
import ScrumBoardDashboard from "./views/ScrumBoardDashboard";

Amplify.configure(awsconfig);
Auth.configure({ oauth: awsauth });

export const Autha: FC = () => {
	const [user, setUser] = useState<{ username: string } | undefined>(undefined);

	useEffect(() => {
		const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
			switch (event) {
				case 'signIn':
					setUser(data);
					break;
				case 'signOut':
					setUser(undefined);
					break;
				default:
					break;
			}
		});

		return unsubscribe;
	}, []);

	if (!user) {
		return (
			<Button type="primary" onClick={() => Auth.federatedSignIn()}>
				Sign in/Up
			</Button>
		);
	}

	return (
		<>
			<div>{user.username}</div>
			<Button type="primary" onClick={() => Auth.signOut()}>
				Sign out
			</Button>
			<ScrumBoardDashboard />
		</>
	);
};
