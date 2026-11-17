import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Input, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export default function Header({ onSearchChange, searchTerm, total }) {
  const { t } = useTranslation()

  return (
    <Flex align="flex-start" className="mb-6" gap="middle" justify="space-between" wrap="wrap">
      <div>
        <Typography.Title level={3} style={{ marginBottom: 4, marginTop: 0 }}>
          {t('employees.title')}
        </Typography.Title>
        <Typography.Text type="secondary">{t('employees.subtitle', { count: total })}</Typography.Text>
      </div>

      <Flex gap="small" wrap="wrap">
        <Input
          allowClear
          aria-label={t('employees.searchPlaceholder')}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('employees.searchPlaceholder')}
          prefix={<SearchOutlined className="text-slate-400" />}
          style={{ width: 240 }}
          value={searchTerm}
        />
        <Button icon={<PlusOutlined />} type="primary">
          {t('employees.addEmployee')}
        </Button>
      </Flex>
    </Flex>
  )
}
