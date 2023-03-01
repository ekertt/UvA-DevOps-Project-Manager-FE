import React, { useState } from "react";
import { Layout, Row, Col, Typography, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title } = Typography;

interface Task {
  id: number;
  title: string;
  description: string;
}

const ScrumBoardDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleCreateTask = (values: any) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: values.title,
      description: values.description,
    };
    setTasks([...tasks, newTask]);
    setModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: "0 16px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              Scrum Board Dashboard
            </Title>
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
      <Content style={{ padding: "16px" }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div
              style={{
                background: "#fff",
                padding: "16px",
                borderRadius: "4px",
              }}
            >
              <Title level={4}>To Do</Title>
              <div style={{ height: "300px" }}></div>
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                background: "#fff",
                padding: "16px",
                borderRadius: "4px",
              }}
            >
              <Title level={4}>In Progress</Title>
              <div style={{ height: "300px" }}></div>
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                background: "#fff",
                padding: "16px",
                borderRadius: "4px",
              }}
            >
              <Title level={4}>Done</Title>
              <div style={{ height: "300px" }}></div>
            </div>
          </Col>
        </Row>
      </Content>
      <Modal
        title="Create Task"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleCreateTask}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ScrumBoardDashboard;
