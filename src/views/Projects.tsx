import { FC, useContext, useEffect, useState } from "react";
import { Button, Form, Input, List, Modal, Popconfirm, Typography } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Project } from "../models/Project";
import {createProject, deleteProject, getProjects, updateProject} from "../api/projects";
import authContext from "../auth/auth-context";

const { Title } = Typography;

export const Projects: FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [projects, setProjects] = useState<Project[]>([]);

    const { user } = useContext(authContext);

    const handleGetProjects = async () => {
        const projects = await getProjects(user!.idToken.jwtToken);
        setProjects(projects);
    };

    const handleCreateProject = async (project: { name: string; description: string }) => {
        try {
            await createProject(project, user!.idToken.jwtToken);
            setIsModalVisible(false);
            form.resetFields();
            await handleGetProjects();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteProject = async (projectId: string) => {
        try {
            await deleteProject(projectId, user!.idToken.jwtToken);
            await handleGetProjects();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditProject = async (project: Project) => {
        try {
            await updateProject(project, user!.idToken.jwtToken);
            setSelectedProject(null);
            setIsEditModalVisible(false);
            await handleGetProjects();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetProjects();
    }, []);

    return (
        <div style={{ margin: "24px" }}>
            <Title level={2}>Projects</Title>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <Button type="primary" onClick={() => setIsModalVisible(true)} icon={<PlusOutlined />}>
                        Create Project
                    </Button>
                </div>
            </div>
            <Modal
                title="Create Project"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleCreateProject} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter a name for your project" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter a description for your project" }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Edit Project"
                open={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    initialValues={{ name: selectedProject?.name, description: selectedProject?.description }}
                    onFinish={() => {
                        form.validateFields().then((values) => {
                            handleEditProject({ ...selectedProject, ...values });
                        });
                    }}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: "Please enter a name for your project" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: "Please enter a description for your project" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <List
                itemLayout="horizontal"
                dataSource={projects}
                renderItem={(project) => (
                    <List.Item>
                        <List.Item.Meta title={project.name} description={project.description} />
                        <Popconfirm
                            title="Are you sure you want to delete this project?"
                            onConfirm={() => handleDeleteProject(project.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger icon={<DeleteOutlined />}>Delete</Button>
                        </Popconfirm>
                        <Button icon={<EditOutlined />} onClick={() => {
                            setSelectedProject(project);
                            setIsEditModalVisible(true);
                        }}>Edit</Button>
                    </List.Item>
                )}
            />
        </div>
    );
};
