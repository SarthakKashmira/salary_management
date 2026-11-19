import { Button, Card, Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import routes from 'constants/routes'

export default function ForgotPassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Flex align="center" className="min-h-screen" justify="center" style={{ padding: 16 }}>
      <Card style={{ width: 420 }}>
        <Typography.Title level={4} style={{ marginBottom: 8, marginTop: 0 }}>
          {t('auth.forgotPassword.title')}
        </Typography.Title>
        <Typography.Text type="secondary">{t('auth.forgotPassword.message')}</Typography.Text>

        <Button block onClick={() => navigate(routes.login)} style={{ marginTop: 24 }} type="primary">
          {t('auth.forgotPassword.backToLogin')}
        </Button>
      </Card>
    </Flex>
  )
}
