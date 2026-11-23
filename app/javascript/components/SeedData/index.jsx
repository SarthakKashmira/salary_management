import { useQueryClient } from '@tanstack/react-query'
import { ClearOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { Button, Flex, Modal, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { COLORS } from 'common/theme'
import QUERY_KEYS from 'constants/queryKeys'
import routes from 'constants/routes'
import { useClearDemoData, useSeedDemoData } from 'hooks/useDemoData'
import useProgress from 'hooks/useProgress'
import { clearSession } from 'utils/auth'

const ALL_QUERY_KEYS = Object.values(QUERY_KEYS).map((key) => [key])

export default function SeedDataModal({ onClose, open }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [seedTaskId, setSeedTaskId] = useState(null)
  const [clearTaskId, setClearTaskId] = useState(null)

  const seedProgress = useProgress('DemoDataChannel', 'task_id', seedTaskId)
  const clearProgress = useProgress('DemoDataChannel', 'task_id', clearTaskId)

  const { mutate: seedDemoData, isPending: isStartingSeed } = useSeedDemoData({
    onSuccess: ({ data }) => setSeedTaskId(data.taskId),
  })

  const { mutate: clearDemoData, isPending: isStartingClear } = useClearDemoData({
    onSuccess: ({ data }) => {
      setIsConfirmOpen(false)
      setClearTaskId(data.taskId)
    },
  })

  useEffect(() => {
    if (seedProgress?.stage !== 'completed') return

    ALL_QUERY_KEYS.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))
    toast.success(t('seedData.seed.success'))
    setSeedTaskId(null)
  }, [seedProgress, queryClient, t])

  useEffect(() => {
    if (clearProgress?.stage !== 'completed') return

    toast.success(t('seedData.clear.success'))
    clearSession()
    navigate(routes.login)
  }, [clearProgress, navigate, t])

  const isSeeding = isStartingSeed || (Boolean(seedTaskId) && seedProgress?.stage !== 'completed')
  const isClearing = isStartingClear || (Boolean(clearTaskId) && clearProgress?.stage !== 'completed')

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
