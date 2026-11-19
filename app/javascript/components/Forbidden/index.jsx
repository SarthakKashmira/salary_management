import { Card, Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { COLORS } from 'common/theme'

export default function Forbidden() {
  const { t } = useTranslation()

  return (
    <Flex align="center" className="h-full min-h-[70vh]" justify="center">
      <Card style={{ width: 520 }}>
        <Flex align="center" gap="large" wrap="nowrap">
          <Typography.Title style={{ color: COLORS.green, flexShrink: 0, fontSize: 80, margin: 0 }}>
            403
          </Typography.Title>
          <Flex style={{ minWidth: 0 }} vertical>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {t('forbidden.title')}
            </Typography.Title>
            <Typography.Text type="secondary">{t('forbidden.subtitle')}</Typography.Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}
