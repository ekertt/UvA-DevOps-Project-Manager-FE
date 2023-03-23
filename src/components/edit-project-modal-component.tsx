/**
 * A React functional component that renders a form to edit a project.
 */
import { FC, useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { ProjectModel } from '../models/project-model';
import { updateProject } from '../api/projects';
import authContext from '../auth/auth-context';

interface EditProjectModalProps {
  project: ProjectModel | null;
  onUpdate: () => void;
}

/**
 * The EditProjectModalComponent is a functional component that renders a form to create a new project.
 *
 * @param {EditProjectModalProps} props - Props passed to this component.
 * @returns {JSX.Element} - A React JSX element.
 */
export const EditProjectModalComponent: FC<EditProjectModalProps> = (props) => {
  const [isUploading, setUploading] = useState<boolean>(false);

  const [editForm] = Form.useForm();

  const { user } = useContext(authContext);

  /**
   * This function handles the update of an existing project and resets the form fields.
   *
   * @param project - The project being updated
   */
  const handleUpdateProject = async (project: ProjectModel) => {
    setUploading(true);

    await editForm.validateFields();
    await updateProject(project, user!.idToken.jwtToken);

    props.onUpdate();

    setUploading(false);
  };

  /**
   * Render a form to edit an existing project with the necessary input fields and a submit button.
   *
   * @returns {JSX.Element} - A React JSX element.
   */
  return (
    <Form
      form={editForm}
      onFinish={handleUpdateProject}
      initialValues={{
        id: props.project?.id,
        name: props.project?.name,
        description: props.project?.description,
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
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
