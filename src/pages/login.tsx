import { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

interface LoginFormData {
  username: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormData) => {
    try {
      setLoading(true);
      // TODO: Implement your login logic here
      console.log("Login values:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Login successful!");
      navigate("/home");
    } catch (error) {
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <div className="mb-8 text-center">
            <Title level={2} className="mb-2 font-bold text-gray-800">
              Welcome Back!
            </Title>
            <p className="text-gray-600">Please sign in to continue</p>
          </div>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                type="email"
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Email"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-primary-blue hover:!bg-primary-purple rounded-lg w-full h-12 font-semibold text-lg"
              >
                Sign In
              </Button>
            </Form.Item>

            <div className="text-center">
              <a className="text-blue-600 text-sm hover:text-blue-800" href="#">
                Forgot password?
              </a>
            </div>
          </Form>
        </div>

        <div className="bg-gray-50 py-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              className="font-medium text-blue-600 hover:text-blue-800"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
