/**
 * A React functional component that renders a form to create a new project.
 */
import { FC, useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { createProject } from '../api/projects';
import authContext from '../auth/auth-context';

interface CreateProjectModalProps {
  onCreate: () => void;
}

/**
 * The CreateProjectModalComponent is a functional component that renders a form to create a new project.
 *
 * @param {CreateProjectModalProps} props - Props passed to this component.
 * @returns {JSX.Element} - A React JSX element.
 */
export const CreateProjectModalComponent: FC<CreateProjectModalProps> = (
  props
) => {
  const [isUploading, setUploading] = useState<boolean>(false);

  const [createForm] = Form.useForm();

  const { user } = useContext(authContext);

  /**
   * This function handles the creation of a new project and resets the form fields.
   *
   * @param {Object} project - An object representing a new project.
   * @returns {Promise<void>} - A Promise that resolves when the project is created successfully.
   */
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

  /**
   * Render a form to create a new project with the necessary input fields and a submit button.
   *
   * @returns {JSX.Element} - A React JSX element.
   */
  return (
    <Form form={createForm} onFinish={handleCreateProject} layout="vertical">
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
        <Button type="primary" loading={isUploading} htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};
