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
  Popconfirm,
  Row,
  Space,
  Typography,
} from 'antd';
import {
  DeleteOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons';
import authContext from '../auth/auth-context';
import { SignInUserSession } from '../models/sign-in-user-session';
import { useParams } from 'react-router-dom';
import { Project } from '../models/Project';
import {deleteProject, getProjectById, updateProject} from '../api/projects';
import {
  createTask,
  deleteTask,
  getTasksForProject,
  updateTask,
} from '../api/tasks';
import { Task } from '../models/Task';

const { Header, Content } = Layout;
const { Title } = Typography;

interface ITaskState {
  todo: Task[];
  'in-progress': Task[];
  done: Task[];
}

const parseNameFirstLetter = (user: SignInUserSession): string => {
  return user.idToken.payload.given_name.charAt(0) || '';
};

const parseName = (user: SignInUserSession): string => {
  const name = user.idToken.payload.given_name;
  const familyName = user.idToken.payload.family_name;

  return `${name} ${familyName}`;
};

const ScrumBoardDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<ITaskState>({
    todo: [],
    'in-progress': [],
    done: [],
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Project | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { user } = useContext(authContext);
  const { project_id } = useParams<{ project_id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProjectById(project_id!, user!.idToken.jwtToken);
      setProject(project);
    };

    fetchProject();
  }, [project_id, user]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasksForProject(
        project_id!,
        user!.idToken.jwtToken
      );
      setTasks({
        todo: tasks.filter((task) => task.state === 'todo'),
        'in-progress': tasks.filter((task) => task.state === 'in-progress'),
        done: tasks.filter((task) => task.state === 'done'),
      });
    };

    fetchTasks();
  }, [project_id, user]);

  const handleGetTasks = async () => {
    const tasks = await getTasksForProject(project_id!, user!.idToken.jwtToken);
    setTasks({
      todo: tasks.filter((task) => task.state === 'todo'),
      'in-progress': tasks.filter((task) => task.state === 'in-progress'),
      done: tasks.filter((task) => task.state === 'done'),
    });
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

  const handleUpdateTaskStateLeft = async (task: Task) => {
    try {
      switch (task.state) {
        case 'todo':
          task.state = 'done';
          break;
        case 'in-progress':
          task.state = 'todo';
          break;
        case 'done':
          task.state = 'in-progress';
          break;
      }
      await updateTask(task, user!.idToken.jwtToken, project_id!);
      await handleGetTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTaskStateRight = async (task: Task) => {
    try {
      switch (task.state) {
        case 'todo':
          task.state = 'in-progress';
          break;
        case 'in-progress':
          task.state = 'done';
          break;
        case 'done':
          task.state = 'todo';
          break;
      }
      await updateTask(task, user!.idToken.jwtToken, project_id!);
      await handleGetTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = async (task: Task) => {
    try {
      await updateTask(task, user!.idToken.jwtToken, project_id!);
      setSelectedTask(null);
      setIsEditModalVisible(false);
      await handleGetTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId, user!.idToken.jwtToken, project_id!);
      await handleGetTasks();
    } catch (error) {
      console.log(error);
    }
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
                    marginRight: '16px',
                  }}
                >
                  {parseNameFirstLetter(user)}
                </Avatar>
                <span>{parseName(user)}</span>
              </div>
            )}
          </Col>
          <Col>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              <PlusOutlined /> New Task
            </Button>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '16px' }}>
        {project && (
          <>
            <Title level={3}>{project.name}</Title>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card title="To Do" style={{ height: '100%' }}>
                  {tasks.todo.map((task) => (
                    <Card
                      key={task.id}
                      title={task.title}
                      extra={
                        <>
                          <Button
                            type="text"
                            onClick={() => handleUpdateTaskStateLeft(task)}
                            disabled
                          >
                            <LeftOutlined />
                          </Button>
                          <Button
                            type="text"
                            onClick={() => handleUpdateTaskStateRight(task)}
                          >
                            <RightOutlined />
                          </Button>
                        </>
                      }
                    >
                      <Space>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        {task.description}
                        <Space.Compact block>
                          <Button onClick={() => handleEditTask(task)}>
                            Edit
                          </Button>
                          <Popconfirm
                            title="Are you sure you want to delete this task?"
                            onConfirm={() => handleDeleteTask(task.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button danger icon={<DeleteOutlined />}>
                              Delete
                            </Button>
                          </Popconfirm>
                        </Space.Compact>
                          </Space>
                      </Space>
                    </Card>
                  ))}
                </Card>
              </Col>
              <Col span={8}>
                <Card title="In Progress" style={{ height: '100%' }}>
                  {tasks['in-progress'].map((task) => (
                    <Card
                      key={task.id}
                      title={task.title}
                      extra={
                        <>
                          <Button
                            type="text"
                            onClick={() => handleUpdateTaskStateLeft(task)}
                          >
                            <LeftOutlined />
                          </Button>
                          <Button
                            type="text"
                            onClick={() => handleUpdateTaskStateRight(task)}
                          >
                            <RightOutlined />
                          </Button>
                        </>
                      }
                    >
                      <Space>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        {task.description}
                        <Space.Compact block>
                          <Button onClick={() => handleEditTask(task)}>
                            Edit
                          </Button>
                          <Popconfirm
                            title="Are you sure you want to delete this task?"
                            onConfirm={() => handleDeleteTask(task.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button danger icon={<DeleteOutlined />}>
                              Delete
                            </Button>
                          </Popconfirm>
                        </Space.Compact>
                      </Space>
                      </Space>
                    </Card>
                  ))}
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Done" style={{ height: '100%' }}>
                  {tasks.done.map((task) => (
                    <Card
                      key={task.id}
                      title={task.title}
                      extra={
                        <>
                          <Button
                            type="text"
                            onClick={() => handleUpdateTaskStateLeft(task)}
                          >
                            <LeftOutlined />
                          </Button>
                          <Button
                            type="text"
                            onClick={() => handleUpdateTaskStateRight(task)}
                            disabled
                          >
                            <RightOutlined />
                          </Button>
                        </>
                      }
                    >
                      <Space>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        {task.description}
                        <Space.Compact block>
                          <Button onClick={() => handleEditTask(task)}>
                            Edit
                          </Button>
                          <Popconfirm
                            title="Are you sure you want to delete this task?"
                            onConfirm={() => handleDeleteTask(task.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button danger icon={<DeleteOutlined />}>
                              Delete
                            </Button>
                          </Popconfirm>
                        </Space.Compact>
                      </Space>
                      </Space>
                    </Card>
                  ))}
                </Card>
              </Col>
            </Row>
          </>
        )}
        <Modal
          title="New Task"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={form.submit}
        >
          <Form form={form} onFinish={handleCreateTask}>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input a title for the task!',
                },
              ]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input a description for the task!',
                },
              ]}
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ScrumBoardDashboard;
