import { FC, useContext, useEffect, useState, useCallback } from 'react';
import {
  Avatar,
  Button,
  List,
  Modal,
  Popconfirm,
  Space,
  Typography,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { ProjectModel } from '../models/project-model';
import { deleteProject, getProjects } from '../api/projects';
import authContext from '../auth/auth-context';
import { EditProjectModalComponent } from '../components/edit-project-modal-component';
import { CreateProjectModalComponent } from '../components/create-project-modal-component';
import { Link } from 'react-router-dom';
import { ProCard } from '@ant-design/pro-components';

const { Title } = Typography;

export const ProjectsPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isCreateModalVisible, setCreateModalVisibility] =
    useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisibility] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(
    null
  );

  const [projects, setProjects] = useState<ProjectModel[]>([]);

  const { user } = useContext(authContext);

  const handleOpenCreateModal = () => {
    setCreateModalVisibility(true);
  };

  const handleOpenEditModal = (project: ProjectModel) => {
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

  const handleGetProjects = useCallback(async () => {
    setIsLoading(true);
    const projects = await getProjects(user!.idToken.jwtToken);
    setProjects(projects);
    setIsLoading(false);
  }, [setIsLoading, setProjects, user]);

  const handleDeleteProject = async (projectId: string) => {
    await deleteProject(projectId, user!.idToken.jwtToken);
    await handleGetProjects();
  };

  useEffect(() => {
    handleGetProjects();
  }, [handleGetProjects]);

  return (
    <ProCard direction="column" ghost gutter={[16, 8]}>
      <ProCard bordered bodyStyle={{ padding: 0, margin: 0 }}>
        <ProCard>
          <Title level={3} style={{ marginBottom: 0, paddingBottom: 0 }}>
            Projects
          </Title>
        </ProCard>
        <ProCard style={{ textAlign: 'right' }}>
          <Space>
            <Button
              onClick={handleGetProjects}
              icon={<ReloadOutlined />}
              loading={isLoading}
            />
            <Button
              type="primary"
              onClick={handleOpenCreateModal}
              icon={<PlusOutlined />}
            >
              Create Project
            </Button>
          </Space>
        </ProCard>
      </ProCard>
      <ProCard bordered>
        <Modal
          title="Edit ProjectModel"
          open={isEditModalVisible}
          onCancel={handleCloseModal}
          onOk={handleCloseModal}
          footer={null}
          destroyOnClose
        >
          <EditProjectModalComponent
            project={selectedProject}
            onUpdate={handleCreateUpdateModal}
          />
        </Modal>

        <Modal
          title="Create ProjectModel"
          open={isCreateModalVisible}
          onCancel={handleCloseModal}
          onOk={handleCloseModal}
          footer={null}
          destroyOnClose
        >
          <CreateProjectModalComponent onCreate={handleCreateUpdateModal} />
        </Modal>

        <List
          itemLayout="horizontal"
          loading={isLoading}
          dataSource={projects}
          renderItem={(project) => (
            <List.Item
              actions={[
                <Popconfirm
                  id={`${project.id}-delete-confirm`}
                  title={`Are you sure you want to delete ${project.name}?`}
                  onConfirm={() => handleDeleteProject(project.id)}
                >
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>,
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleOpenEditModal(project)}
                />,
                <Link to={`/projects/${project.id}`}>
                  <Button type="link" icon={<EyeOutlined />} />
                </Link>,
              ]}
            >
              <List.Item.Meta
                title={project.name}
                description={project.description}
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: '#fde3cf',
                      color: '#f56a00',
                    }}
                  >
                    {project.name.substring(0, 2).toUpperCase()}
                  </Avatar>
                }
              />
            </List.Item>
          )}
        />
      </ProCard>
    </ProCard>
  );
};
