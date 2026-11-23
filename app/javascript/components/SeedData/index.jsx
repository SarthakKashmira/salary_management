import { ClearOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { Button, Flex, Modal, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { COLORS } from 'common/theme'
import routes from 'constants/routes'
import { useClearDemoData, useSeedDemoData } from 'hooks/useDemoData'
import { clearSession } from 'utils/auth'

export default function SeedDataModal({ onClose, open }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const { mutate: seedDemoData, isPending: isSeeding } = useSeedDemoData({
    onSuccess: () => toast.success(t('seedData.seed.success')),
  })

  const { mutate: clearDemoData, isPending: isClearing } = useClearDemoData({
    onSuccess: () => {
      setIsConfirmOpen(false)
      toast.success(t('seedData.clear.success'))
      clearSession()
      navigate(routes.login)
    },
  })

  return (
    <>
      <Modal
        centered
        footer={null}
        onCancel={onClose}
        open={open}
        styles={{ mask: { backdropFilter: 'blur(4px)' } }}
        title={t('seedData.title')}
      >
        <Flex gap={20} vertical>
          <Typography.Text type="secondary">{t('seedData.description')}</Typography.Text>

          <Flex align="center" gap={16} justify="space-between">
            <Typography.Text>{t('seedData.seed.description')}</Typography.Text>
            <Button icon={<ThunderboltOutlined />} loading={isSeeding} onClick={() => seedDemoData()}>
              {t('seedData.seed.label')}
            </Button>
          </Flex>

          <Flex align="center" gap={16} justify="space-between">
            <Typography.Text>{t('seedData.clear.description')}</Typography.Text>
            <Button danger icon={<ClearOutlined />} loading={isClearing} onClick={() => setIsConfirmOpen(true)}>
              {t('seedData.clear.label')}
            </Button>
          </Flex>
        </Flex>
      </Modal>

      <Modal
        cancelText={t('common.cancel')}
        centered
        confirmLoading={isClearing}
        okButtonProps={{ style: { backgroundColor: COLORS.redMedium, borderColor: COLORS.redMedium } }}
        okText={t('seedData.clear.confirmOk')}
        onCancel={() => setIsConfirmOpen(false)}
        onOk={() => clearDemoData()}
        open={isConfirmOpen}
        styles={{ mask: { backdropFilter: 'blur(4px)' } }}
        title={t('seedData.clear.confirmTitle')}
      >
        <Typography.Text>{t('seedData.clear.confirmDescription')}</Typography.Text>
      </Modal>
    </>
  )
}
