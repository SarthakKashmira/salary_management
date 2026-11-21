import { InboxOutlined } from '@ant-design/icons'
import { Button, Flex, Modal, Typography, Upload } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import useImportEmployees from 'hooks/useEmployeeImport'

const { Dragger } = Upload

const INSTRUCTIONS_STEP = 'instructions'
const UPLOAD_STEP = 'upload'

export default function EmployeeImportModal({ onClose, open }) {
  const { t } = useTranslation()
  const [step, setStep] = useState(INSTRUCTIONS_STEP)
  const [file, setFile] = useState(null)

  const requiredColumns = t('employeeImport.instructions.required', { returnObjects: true })
  const optionalColumns = t('employeeImport.instructions.optional', { returnObjects: true })

  const { mutate: importEmployees, isPending } = useImportEmployees({
    onSuccess: () => {
      toast.success(t('employeeImport.upload.success'))
      handleClose()
    },
  })

  const handleClose = () => {
    setStep(INSTRUCTIONS_STEP)
    setFile(null)
    onClose()
  }

  const handleSubmit = () => {
    if (!file) {
      toast.error(t('employeeImport.upload.selectFileError'))

      return
    }

    importEmployees(file)
  }

  return (
    <Modal
      centered
      footer={null}
      onCancel={handleClose}
      open={open}
      styles={{ mask: { backdropFilter: 'blur(4px)' } }}
      title={t('employeeImport.title')}
    >
      {step === INSTRUCTIONS_STEP ? (
        <>
          <Typography.Text>{t('employeeImport.instructions.subtitle')}</Typography.Text>

          <Typography.Text strong style={{ display: 'block', marginBottom: 4, marginTop: 16 }}>
            {t('employeeImport.instructions.requiredTitle')}
          </Typography.Text>
          <ul style={{ listStyleType: 'disc', marginBottom: 0, paddingInlineStart: 20 }}>
            {requiredColumns.map((column) => (
              <li key={column}>{column}</li>
            ))}
          </ul>

          <Typography.Text strong style={{ display: 'block', marginBottom: 4, marginTop: 16 }}>
            {t('employeeImport.instructions.optionalTitle')}
          </Typography.Text>
          <ul style={{ listStyleType: 'disc', marginBottom: 0, paddingInlineStart: 20 }}>
            {optionalColumns.map((column) => (
              <li key={column}>{column}</li>
            ))}
          </ul>

          <Flex justify="end" style={{ marginTop: 24 }}>
            <Button onClick={() => setStep(UPLOAD_STEP)} type="primary">
              {t('employeeImport.instructions.next')}
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Typography.Text>{t('employeeImport.upload.subtitle')}</Typography.Text>

          <Dragger
            accept=".csv,.xlsx,.xls"
            beforeUpload={(selectedFile) => {
              setFile(selectedFile)

              return false
            }}
            fileList={file ? [ file ] : []}
            maxCount={1}
            onRemove={() => setFile(null)}
            style={{ marginTop: 16 }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{t('employeeImport.upload.dragText')}</p>
          </Dragger>

          <Flex gap="small" justify="end" style={{ marginTop: 24 }}>
            <Button onClick={() => setStep(INSTRUCTIONS_STEP)}>{t('employeeImport.upload.back')}</Button>
            <Button loading={isPending} onClick={handleSubmit} type="primary">
              {t('employeeImport.upload.submit')}
            </Button>
          </Flex>
        </>
      )}
    </Modal>
  )
}
