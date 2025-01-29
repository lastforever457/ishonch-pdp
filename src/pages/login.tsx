import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouterPush } from '../hooks/use-router-push'
import { useAuth } from '../providers/auth-context-provider'

const Login = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const { push } = useRouterPush()

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      await login(values.username, values.password)
      push({ url: '/' })
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card title={t('login.title')} className="w-96">
        <Form form={form} name="login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: t('required') }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t('username')}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: t('required') }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('password')}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              {t('login.title')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
