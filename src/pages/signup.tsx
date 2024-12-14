import { useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Typography,
  Radio,
  DatePicker,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";

const { Title } = Typography;

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = async (values: Record<string, any>) => {
    try {
      const { firstName, lastName, gender, birthday, email, password, phone } =
        values;
      const data = {
        firstName,
        lastName,
        gender,
        birthday,
        email,
        password,
        phone,
      };
      const response = await api.post("/auth/signup", data);

      if (response.status !== 200) {
        throw new Error("Signup failed. Please try again.");
      }

      message.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      message.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <div className="mb-8 text-center">
            <Title level={2} className="mb-2 font-bold text-gray-800">
              Create Account
            </Title>
            <p className="text-gray-600">
              Please fill in your details to sign up
            </p>
          </div>

          <Form
            name="signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="First Name"
                className="rounded-lg"
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Last Name"
                className="rounded-lg"
              />
            </Form.Item>
            <Form.Item
              name="gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Radio.Group className="flex gap-4">
                <Radio value="MALE">Male</Radio>
                <Radio value="FEMALE">Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="birthday"
              rules={[
                { required: true, message: "Please input your birth date!" },
              ]}
            >
              <DatePicker
                format="DD-MM-YYYY"
                className="w-full"
                placeholder="Birth Date"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400" />}
                placeholder="Phone Number"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Email"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm Password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary-blue hover:!bg-primary-purple rounded-lg w-full h-12 font-semibold text-lg"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="bg-gray-50 py-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
