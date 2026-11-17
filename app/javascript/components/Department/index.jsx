import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export default function Department() {
  const { t } = useTranslation()

  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        {t('nav.departments')}
      </Typography.Title>
      <Typography.Paragraph type="secondary">{t('common.comingSoon')}</Typography.Paragraph>
    </>
  )
}
