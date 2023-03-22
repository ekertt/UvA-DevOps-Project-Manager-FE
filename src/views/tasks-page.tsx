import React, { useContext, useEffect, useState } from 'react';
import {
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
  ReloadOutlined,
  RightOutlined,
} from '@ant-design/icons';
import authContext from '../auth/auth-context';
import { Link, useParams } from 'react-router-dom';
import { ProjectModel } from '../models/project-model';
import { getProjectById } from '../api/projects';
import {
  createTask,
  deleteTask,
  getTasksForProject,
  updateTask,
} from '../api/tasks';
import { TaskModel } from '../models/task-model';
import { EditTaskModalComponent } from '../components/edit-task-modal-component';
import { ProCard } from '@ant-design/pro-components';

const { Content } = Layout;
const { Title } = Typography;

interface ITaskState {
  todo: TaskModel[];
  'in-progress': TaskModel[];
  done: TaskModel[];
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<ITaskState>({
    todo: [],
    'in-progress': [],
    done: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setEditModalVisibility] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskModel | null>(null);
  const [form] = Form.useForm();

  const { user } = useContext(authContext);
  const { project_id } = useParams<{ project_id: string }>();
  const [project, setProject] = useState<ProjectModel | null>(null);

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

  const handleOpenEditModal = (task: TaskModel) => {
    setSelectedTask(task);
    setEditModalVisibility(true);
  };

  const handleCloseModal = () => {
    setEditModalVisibility(false);
  };

  const handleGetTasks = async () => {
    setIsLoading(true);

    const tasks = await getTasksForProject(project_id!, user!.idToken.jwtToken);
    setTasks({
      todo: tasks.filter((task) => task.state === 'todo'),
      'in-progress': tasks.filter((task) => task.state === 'in-progress'),
      done: tasks.filter((task) => task.state === 'done'),
    });

    setIsLoading(false);
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

  const handleUpdateTaskStateLeft = async (task: TaskModel) => {
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

  const handleUpdateTaskStateRight = async (task: TaskModel) => {
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

  const handleCreateUpdateModal = async () => {
    handleCloseModal();
    await handleGetTasks();
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
      <ProCard direction="column" ghost gutter={[16, 8]}>
        <ProCard bordered bodyStyle={{ padding: 0, margin: 0 }}>
          <ProCard>
            <Space>
              <Link to={`/`}>
                <Button type="text" icon={<LeftOutlined />} />
              </Link>
              <Title level={3} style={{ marginBottom: 0, paddingBottom: 0 }}>
                {project?.name}
              </Title>
            </Space>
          </ProCard>
          <ProCard style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={handleGetTasks} />
              <Button type="primary" onClick={() => setModalVisible(true)}>
                <PlusOutlined /> New TaskModel
              </Button>
            </Space>
          </ProCard>
        </ProCard>
      </ProCard>
      <Content style={{ padding: '16px' }}>
        {project && (
          <>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card
                  loading={isLoading}
                  title="To-Do"
                  style={{ height: '100%' }}
                >
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
                        <Space
                          direction="vertical"
                          size="middle"
                          style={{ display: 'flex' }}
                        >
                          {task.description}
                          <Space.Compact block>
                            <Button onClick={() => handleOpenEditModal(task)}>
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
                <Card
                  loading={isLoading}
                  title="In Progress"
                  style={{ height: '100%' }}
                >
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
                        <Space
                          direction="vertical"
                          size="middle"
                          style={{ display: 'flex' }}
                        >
                          {task.description}
                          <Space.Compact block>
                            <Button onClick={() => handleOpenEditModal(task)}>
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
                <Card
                  loading={isLoading}
                  title="Done"
                  style={{ height: '100%' }}
                >
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
                        <Space
                          direction="vertical"
                          size="middle"
                          style={{ display: 'flex' }}
                        >
                          {task.description}
                          <Space.Compact block>
                            <Button onClick={() => handleOpenEditModal(task)}>
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
          title="New TaskModel"
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
        <Modal
          title="Edit TaskModel"
          open={isEditModalVisible}
          onCancel={handleCloseModal}
          onOk={handleCloseModal}
          footer={null}
          destroyOnClose
        >
          <EditTaskModalComponent
            task={selectedTask}
            onUpdate={handleCreateUpdateModal}
          />
        </Modal>
      </Content>
    </Layout>
  );
};

export default TasksPage;
