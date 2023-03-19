import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Typography,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import authContext from '../auth/auth-context';
import { SignInUserSession } from '../models/sign-in-user-session';
import { useParams } from 'react-router-dom';
import { Project } from '../models/Project';
import { getProjectById } from '../api/projects';
import { createTask, getTasksForProject } from '../api/tasks';
import { Task } from '../models/Task';

const { Header, Content } = Layout;
const { Title } = Typography;

const parseNameFirstLetter = (user: SignInUserSession): string => {
  return user.idToken.payload.given_name.at(0) ?? '';
};

const parseName = (user: SignInUserSession): string => {
  const name = user.idToken.payload.given_name;
  const familyName = user.idToken.payload.family_name;

  return `${name} ${familyName}`;
};

const ScrumBoardDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { user } = useContext(authContext);
  const { project_id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProjectById(project_id!, user!.idToken.jwtToken);
      setProject(project);
    };

    fetchProject();
  }, [project_id]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasksForProject(
        project_id!,
        user!.idToken.jwtToken
      );
      setTasks(tasks);
    };

    fetchTasks();
  }, [project_id]);

  const handleGetTasks = async () => {
    const tasks = await getTasksForProject(project_id!, user!.idToken.jwtToken);
    setTasks(tasks);
  };

  const handleCreateTask = async (values: any) => {
    await createTask(
      project_id!,
      {
        title: values.title,
        description: values.description,
        state: 'todo',
      },
      user!.idToken.jwtToken
    );
    form.resetFields();
    setModalVisible(false);
    await handleGetTasks();
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 16px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            {user && (
              <div>
                <Avatar
                  style={{
                    backgroundColor: '#fde3cf',
                    color: '#f56a00',
                  }}
                >
                  {parseNameFirstLetter(user)}
                </Avatar>
                <span>{parseName(user)}</span>
              </div>
            )}
          </Col>
          <Col>
            <div style={{ fontWeight: 700 }}>{project?.name}</div>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Create Task
            </Button>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div
              style={{
                background: '#fff',
                padding: '16px',
                borderRadius: '4px',
              }}
            >
              <Title level={4}>To Do</Title>
              {tasks
                .filter((task) => task.state === 'todo')
                .map((task) => (
                  <Card title={task.title} style={{ marginBottom: '16px' }}>
                    <p>{task.description}</p>
                  </Card>
                ))}
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                background: '#fff',
                padding: '16px',
                borderRadius: '4px',
              }}
            >
              <Title level={4}>In Progress</Title>
              {tasks
                .filter((task) => task.state === 'in-progress')
                .map((task) => (
                  <Card title={task.title} style={{ marginBottom: '16px' }}>
                    <p>{task.description}</p>
                  </Card>
                ))}
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                background: '#fff',
                padding: '16px',
                borderRadius: '4px',
              }}
            >
              <Title level={4}>Done</Title>
              {tasks
                .filter((task) => task.state === 'done')
                .map((task) => (
                  <Card title={task.title} style={{ marginBottom: '16px' }}>
                    <p>{task.description}</p>
                  </Card>
                ))}
            </div>
          </Col>
        </Row>
        <Modal
          title="Create Project"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateTask} layout="vertical">
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: 'Please enter a title for your project',
                },
              ]}
            >
              <Input />
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
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ScrumBoardDashboard;
