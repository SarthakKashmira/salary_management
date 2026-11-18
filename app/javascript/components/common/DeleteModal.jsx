import { Modal, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { COLORS } from 'common/theme'

const pluralize = (word, count) => (count === 1 ? word : `${word}s`)

export default function DeleteModal({ confirmLoading, count, entityName, onCancel, onConfirm, open }) {
  const { t } = useTranslation()

  const entity = pluralize(entityName, count)

  return (
    <Modal
      cancelText={t('common.cancel')}
      centered
      confirmLoading={confirmLoading}
      okButtonProps={{ style: { backgroundColor: COLORS.redMedium, borderColor: COLORS.redMedium } }}
      okText={t('common.proceed')}
      onCancel={onCancel}
      onOk={onConfirm}
      open={open}
      styles={{ mask: { backdropFilter: 'blur(4px)' } }}
      title={t('common.deleteModal.title', { count, entity })}
    >
      <Typography.Text>{t('common.deleteModal.description', { count, entity })}</Typography.Text>
    </Modal>
  )
}
