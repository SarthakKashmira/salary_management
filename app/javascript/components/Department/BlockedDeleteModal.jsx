import { Modal, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const pluralize = (word, count) => (count === 1 ? word : `${word}s`)

export default function BlockedDeleteModal({ departments, onCancel, open }) {
  const { t } = useTranslation()

  return (
    <Modal
      centered
      footer={null}
      onCancel={onCancel}
      open={open}
      styles={{ mask: { backdropFilter: 'blur(4px)' } }}
      title={t('departments.bulkDelete.blockedTitle')}
    >
      <Typography.Paragraph>{t('departments.bulkDelete.blockedDescription')}</Typography.Paragraph>
      <ul style={{ margin: 0, paddingInlineStart: 20 }}>
        {departments.map((department) => (
          <li key={department.id}>
            {department.name} — {department.employeesCount} {pluralize('employee', department.employeesCount)}
          </li>
        ))}
      </ul>
    </Modal>
  )
}
