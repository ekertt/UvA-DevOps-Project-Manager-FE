/**
 * A React functional component that renders a form to create a new task for a project.
 */
import { FC, useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import authContext from '../auth/auth-context';
import { createTask } from '../api/tasks';

interface CreateTaskModalProps {
  onCreate: () => void;
  projectId: string;
}

/**
 * The CreateTaskModalComponent is a functional component that renders a form to create a new task for a project.
 *
 * @param {CreateTaskModalProps} props - Props passed to this component.
 * @returns {JSX.Element} - A React JSX element.
 */
export const CreateTaskModalComponent: FC<CreateTaskModalProps> = (props) => {
  const [isUploading, setUploading] = useState<boolean>(false);

  const [createTaskForm] = Form.useForm();

  const { user } = useContext(authContext);

  /**
   * This function handles the creation of a new task and resets the form fields.
   *
   * @param {Object} values - An object representing a new task.
   * @returns {Promise<void>} - A Promise that resolves when the task is created successfully.
   */
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

  /**
   * Render a form to create a new task with the necessary input fields and a submit button.
   *
   * @returns {JSX.Element} - A React JSX element.
   */
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
