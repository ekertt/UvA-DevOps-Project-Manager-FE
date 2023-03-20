import {FC, useContext, useState} from "react";
import {Button, Form, Input} from "antd";
import {createProject} from "../api/projects";
import authContext from "../auth/auth-context";

interface EditProjectModalProps {
	onCreate: () => void;
}

export const CreateProjectModal: FC<EditProjectModalProps> = (props) => {
	const [isUploading, setUploading] = useState<boolean>(false);

	const [createForm] = Form.useForm();

	const {user} = useContext(authContext);

	const handleCreateProject = async (project: {
		name: string;
		description: string;
	}) => {
		setUploading(true);

		await createProject(project, user!.idToken.jwtToken);
		createForm.resetFields();

		setUploading(false);

		props.onCreate();
	};

	return (
		<Form
			form={createForm}
			onFinish={handleCreateProject}
			layout="vertical">
			<Form.Item
				name="name"
				label="Name"
				rules={[
					{
						required: true,
						message: 'Please enter a name for your project',
					},
				]}
			>
				<Input/>
			</Form.Item>
			<Form.Item
				name="description"
				label="Description"
				rules={[
					{
						required: true,
						message: 'Please enter a description for your project',
					},
				]}
			>
				<Input.TextArea/>
			</Form.Item>
			<Form.Item>
				<Button type="primary" loading={isUploading} htmlType="submit">
					Create
				</Button>
			</Form.Item>
		</Form>)
}
