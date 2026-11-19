import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Input, theme, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { COLORS } from 'common/theme'
import routes from 'constants/routes'

export default function Header({ isBulkDeleting, onOpenDeleteModal, onSearchChange, searchTerm, selectedCount, total }) {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const navigate = useNavigate()

  return (
    <Flex align="flex-start" gap="middle" justify="space-between" style={{ marginBottom: 20 }} wrap="wrap">
      <div>
        <Typography.Title level={3} style={{ marginBottom: 4, marginTop: 0 }}>
          {t('employees.title')}
        </Typography.Title>
        <Flex align="center" gap="small" wrap="wrap">
          <Typography.Text type="secondary">{t('employees.subtitle', { count: total })}</Typography.Text>
          {selectedCount > 0 && (
            <Button
              icon={<DeleteOutlined />}
              loading={isBulkDeleting}
              onClick={onOpenDeleteModal}
              size="small"
              style={{ backgroundColor: COLORS.redMedium, borderColor: COLORS.redMedium }}
              type="primary"
            >
              {t('employees.bulkDelete.button', { count: selectedCount })}
            </Button>
          )}
        </Flex>
      </div>

      <Flex gap="small" wrap="wrap">
        <Input
          allowClear
          aria-label={t('employees.searchPlaceholder')}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('employees.searchPlaceholder')}
          prefix={<SearchOutlined style={{ color: token.colorTextPlaceholder }} />}
          style={{ width: 240 }}
          value={searchTerm}
        />
        <Button icon={<PlusOutlined />} onClick={() => navigate(routes.employees.new)} type="primary">
          {t('employees.addEmployee')}
        </Button>
      </Flex>
    </Flex>
  )
}
