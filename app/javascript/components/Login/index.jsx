import { Card, Flex, Tabs, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Navigate, useSearchParams } from 'react-router-dom'

import logo from 'assets/A-logo.webp'
import routes from 'constants/routes'
import { isAuthenticated } from 'utils/auth'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function Login() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  if (isAuthenticated()) return <Navigate replace to={routes.root} />

  const invitedEmail = searchParams.get('email')

  const items = [
    { children: <LoginForm />, key: 'login', label: t('auth.login.tabTitle') },
    { children: <RegisterForm invitedEmail={invitedEmail} />, key: 'register', label: t('auth.register.tabTitle') },
  ]

  return (
    <Flex align="center" className="min-h-screen" justify="center" style={{ padding: 16 }}>
      <Card style={{ width: 420 }}>
        <Flex align="center" gap={8} justify="center" style={{ marginBottom: 24 }}>
          <img alt={t('app.name')} className="h-8 w-8 object-contain" src={logo} />
          <Typography.Text strong>{t('app.name')}</Typography.Text>
        </Flex>

        <Tabs centered defaultActiveKey={invitedEmail ? 'register' : 'login'} items={items} />
      </Card>
    </Flex>
  )
}
