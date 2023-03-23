import { FC, useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import authContext from '../auth/auth-context';
import { createTask } from '../api/tasks';

interface CreateTaskModalProps {
  onCreate: () => void;
  projectId: string;
}

export const CreateTaskModalComponent: FC<CreateTaskModalProps> = (props) => {
  const [isUploading, setUploading] = useState<boolean>(false);

  const [createTaskForm] = Form.useForm();

  const { user } = useContext(authContext);

  const handleCreateTask = async (values: any) => {
    await createTask(
      props.projectId,
      {
        title: values.title,
        description: values.description,
        state: 'todo',
      },
      user!.idToken.jwtToken
    );
    createTaskForm.resetFields();
    setUploading(false);
    props.onCreate();
  };

  return (
    <Form form={createTaskForm} onFinish={handleCreateTask} layout="vertical">
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: 'Please enter a name for your task',
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
            message: 'Please enter a description for your task',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" loading={isUploading} htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};
