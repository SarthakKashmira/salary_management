import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Input, theme, Typography } from 'antd'
import { isEmpty } from 'ramda'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { COLORS } from 'common/theme'
import DeleteModal from 'components/common/DeleteModal'
import routes from 'constants/routes'

import BlockedDeleteModal from '../BlockedDeleteModal'

export default function Header({
  blockedDepartments,
  isBulkDeleting,
  isDeleteModalOpen,
  onCancelDelete,
  onConfirmDelete,
  onOpenDeleteModal,
  onSearchChange,
  searchTerm,
  selectedCount,
  total,
}) {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const navigate = useNavigate()

  const hasBlockedDepartments = !isEmpty(blockedDepartments)

  return (
    <Flex align="flex-start" gap="middle" justify="space-between" style={{ marginBottom: 20 }} wrap="wrap">
      <div>
        <Typography.Title level={3} style={{ marginBottom: 4, marginTop: 0 }}>
          {t('departments.title')}
        </Typography.Title>
        <Flex align="center" gap="small" wrap="wrap">
          <Typography.Text type="secondary">{t('departments.subtitle', { count: total })}</Typography.Text>
          {selectedCount > 0 && (
            <Button
              icon={<DeleteOutlined />}
              loading={isBulkDeleting}
              onClick={onOpenDeleteModal}
              size="small"
              style={{ backgroundColor: COLORS.redMedium, borderColor: COLORS.redMedium }}
              type="primary"
            >
              {t('departments.bulkDelete.button', { count: selectedCount })}
            </Button>
          )}
        </Flex>
      </div>

      <Flex gap="small" wrap="wrap">
        <Input
          allowClear
          aria-label={t('departments.searchPlaceholder')}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('departments.searchPlaceholder')}
          prefix={<SearchOutlined style={{ color: token.colorTextPlaceholder }} />}
          style={{ width: 240 }}
          value={searchTerm}
        />
        <Button icon={<PlusOutlined />} onClick={() => navigate(routes.departments.new)} type="primary">
          {t('departments.addDepartment')}
        </Button>
      </Flex>

      {hasBlockedDepartments ? (
        <BlockedDeleteModal departments={blockedDepartments} onCancel={onCancelDelete} open={isDeleteModalOpen} />
      ) : (
        <DeleteModal
          confirmLoading={isBulkDeleting}
          count={selectedCount}
          entityName="department"
          onCancel={onCancelDelete}
          onConfirm={onConfirmDelete}
          open={isDeleteModalOpen}
        />
      )}
    </Flex>
  )
}
