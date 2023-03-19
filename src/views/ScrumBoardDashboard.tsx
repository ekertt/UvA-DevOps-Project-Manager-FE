import React, {useContext, useState} from "react";
import {Avatar, Button, Col, Form, Input, Layout, Modal, Row, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import authContext from "../auth/auth-context";
import {SignInUserSession} from "../models/sign-in-user-session";

const {Header, Content} = Layout;
const {Title} = Typography;

interface Task {
	id: number;
	title: string;
	description: string;
}

const parseNameFirstLetter = (user: SignInUserSession): string => {
	return user.idToken.payload.given_name.at(0) ?? '';
}

const parseName = (user: SignInUserSession): string => {
	const name = user.idToken.payload.given_name;
	const familyName = user.idToken.payload.family_name

	return `${name} ${familyName}`;
}

const ScrumBoardDashboard: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const {user} = useContext(authContext);

	const handleCreateTask = (values: any) => {
		const newTask: Task = {
			id: tasks.length + 1,
			title: values.title,
			description: values.description,
		};
		setTasks([...tasks, newTask]);
		setModalVisible(false);
	};

	return (
		<Layout style={{minHeight: "100vh"}}>
			<Header style={{background: "#fff", padding: "0 16px"}}>
				<Row justify="space-between" align="middle">
					<Col>
						{user && (<div>
							<Avatar style={{
								backgroundColor: '#fde3cf',
								color: '#f56a00'
							}}>{parseNameFirstLetter(user)}
							</Avatar>
							<span>{parseName(user)}</span>
						</div>)}
					</Col>
					<Col>
						<Button
							type="primary"
							icon={<PlusOutlined/>}
							onClick={() => setModalVisible(true)}
						>
							Create Task
						</Button>
					</Col>
				</Row>
			</Header>
			<Content style={{padding: "16px"}}>
				<Row gutter={[16, 16]}>
					<Col span={8}>
						<div
							style={{
								background: "#fff",
								padding: "16px",
								borderRadius: "4px",
							}}
						>
							<Title level={4}>To Do</Title>
							<div style={{height: "300px"}}></div>
						</div>
					</Col>
					<Col span={8}>
						<div
							style={{
								background: "#fff",
								padding: "16px",
								borderRadius: "4px",
							}}
						>
							<Title level={4}>In Progress</Title>
							<div style={{height: "300px"}}></div>
						</div>
					</Col>
					<Col span={8}>
						<div
							style={{
								background: "#fff",
								padding: "16px",
								borderRadius: "4px",
							}}
						>
							<Title level={4}>Done</Title>
							<div style={{height: "300px"}}></div>
						</div>
					</Col>
				</Row>
			</Content>
			<Modal
				title="Create Task"
				open={modalVisible}
				onCancel={() => setModalVisible(false)}
				footer={null}
			>
				<Form onFinish={handleCreateTask}>
					<Form.Item
						name="title"
						label="Title"
						rules={[{required: true, message: "Please enter a title"}]}
					>
						<Input/>
					</Form.Item>
					<Form.Item name="description" label="Description">
						<Input.TextArea/>
					</Form.Item>
					<Button type="primary" htmlType="submit">
						Create
					</Button>
				</Form>
			</Modal>
		</Layout>
	);
};

export default ScrumBoardDashboard;
