import {FC, useContext, useEffect, useState} from 'react';
import {Button, List, Modal, Popconfirm, Space, Typography} from 'antd';
import {DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, ReloadOutlined} from '@ant-design/icons';
import {Project} from '../models/Project';
import {deleteProject, getProjects,} from '../api/projects';
import authContext from '../auth/auth-context';
import {EditProjectModal} from "./edit-project-modal";
import {CreateProjectModal} from "./create-project-modal";

const {Title} = Typography;

export const Projects: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isCreateModalVisible, setCreateModalVisibility] = useState<boolean>(false);
	const [isEditModalVisible, setEditModalVisibility] = useState<boolean>(false);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const [projects, setProjects] = useState<Project[]>([]);

	const {user} = useContext(authContext);

	const handleOpenCreateModal = () => {
		setCreateModalVisibility(true);
	};

	const handleOpenEditModal = (project: Project) => {
		setSelectedProject(project);
		setEditModalVisibility(true);
	};

	const handleCloseModal = () => {
		setEditModalVisibility(false);
		setCreateModalVisibility(false);
	};

	const handleCreateUpdateModal = async () => {
		handleCloseModal();
		await handleGetProjects();
	};

	const handleGetProjects = async () => {
		setIsLoading(true);
		const projects = await getProjects(user!.idToken.jwtToken);
		setProjects(projects);
		setIsLoading(false);
	};

	const handleDeleteProject = async (projectId: string) => {
		await deleteProject(projectId, user!.idToken.jwtToken);
		await handleGetProjects();
	};

	useEffect(() => {
		handleGetProjects();
	}, []);

	return (
		<div style={{margin: '24px'}}>
			<Title level={2}>Projects</Title>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '16px',
				}}
			>
				<div
					style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}
				>
					<Space>
						<Button
							onClick={handleGetProjects}
							icon={<ReloadOutlined/>}
							loading={isLoading}
						/>
						<Button
							type="primary"
							onClick={handleOpenCreateModal}
							icon={<PlusOutlined/>}
						>
							Create Project
						</Button>
					</Space>
				</div>
			</div>

			<Modal
				title="Edit Project"
				open={isEditModalVisible}
				onCancel={handleCloseModal}
				onOk={handleCloseModal}
				footer={null}
				destroyOnClose
			>
				<EditProjectModal project={selectedProject} onUpdate={handleCreateUpdateModal}/>
			</Modal>

			<Modal
				title="Create Project"
				open={isCreateModalVisible}
				onCancel={handleCloseModal}
				onOk={handleCloseModal}
				footer={null}
				destroyOnClose
			>
				<CreateProjectModal onCreate={handleCreateUpdateModal}/>
			</Modal>

			<List
				loading={isLoading}
				dataSource={projects}
				renderItem={(project) => (
					<List.Item>
						<List.Item.Meta
							title={project.name}
							description={project.description}
						/>
						<Space>
							<Popconfirm
								id={`${project.id}-delete-confirm`}
								title={`Are you sure you want to delete ${project.name}?`}
								onConfirm={() => handleDeleteProject(project.id)}
							>
								<Button danger icon={<DeleteOutlined/>}/>
							</Popconfirm>
							<Button
								icon={<EditOutlined/>}
								onClick={() => handleOpenEditModal(project)}
							/>
							<Button type="primary" icon={<EyeOutlined/>} href={`/projects/${project.id}`}/>
						</Space>
					</List.Item>
				)}
			/>
		</div>
	);
};
