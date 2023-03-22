import { FC, useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { TaskModel } from '../models/task-model';
import { updateTask } from '../api/tasks';
import authContext from '../auth/auth-context';
import { useParams } from 'react-router-dom';

interface EditTaskModalProps {
  task: TaskModel | null;
  onUpdate: () => void;
}

export const EditTaskModalComponent: FC<EditTaskModalProps> = (props) => {
  const [isUploading, setUploading] = useState<boolean>(false);

  const [editForm] = Form.useForm();

  const { user } = useContext(authContext);
  const { project_id } = useParams<{ project_id: string }>();

  const handleUpdateTask = async (task: TaskModel) => {
    setUploading(true);

    await editForm.validateFields();
    await updateTask(task, user!.idToken.jwtToken, project_id!);

    props.onUpdate();

    setUploading(false);
  };

  return (
    <Form
      form={editForm}
      onFinish={handleUpdateTask}
      initialValues={{
        id: props.task?.id,
        title: props.task?.title,
        description: props.task?.description,
        state: props.task?.state,
      }}
      layout="vertical"
    >
      <Form.Item
        hidden
        name="id"
        label="id"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        hidden
        name="state"
        label="state"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: 'Please enter a title for your task',
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
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
