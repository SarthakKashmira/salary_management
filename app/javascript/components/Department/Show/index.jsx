import { ApartmentOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Flex, Form, Input, Typography } from 'antd'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { COLORS } from 'common/theme'
import Spinner from 'components/common/Spinner'
import routes from 'constants/routes'
import { useShowDepartment, useUpdateDepartment } from 'hooks/department'

import { VALIDATION_SCHEMA } from '../Form/constants'
import { buildDepartmentPayload, getFieldStatus } from '../Form/utils'
import { buildInitialValuesFromDepartment } from './utils'

export default function DepartmentShow() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: department, isLoading } = useShowDepartment(id)

  const { mutate: updateDepartment, isPending } = useUpdateDepartment({
    onSuccess: () => {
      toast.success(t('departments.show.updatedSuccessfully'))
      navigate(routes.departments.index)
    },
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: department ? buildInitialValuesFromDepartment(department) : { name: '', code: '', description: '' },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => updateDepartment({ id, payload: buildDepartmentPayload(values) }),
  })

  const { handleBlur, handleChange, handleSubmit, values } = formik

  const fieldItemProps = (name, label) => ({ htmlFor: name, label, ...getFieldStatus(formik, name) })

  if (isLoading) return <Spinner />

  return (
    <div style={{ maxWidth: 640 }}>
      <Flex align="center" className="mb-6" gap="middle">
        <Avatar icon={<ApartmentOutlined />} size={64} style={{ backgroundColor: COLORS.green, flexShrink: 0 }} />
        <Typography.Title level={3} style={{ margin: 0 }}>
          {values.name || department.name}
        </Typography.Title>
      </Flex>

      <Card>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item {...fieldItemProps('name', t('departments.form.fields.name'))} required>
            <Input id="name" name="name" onBlur={handleBlur} onChange={handleChange} value={values.name} />
          </Form.Item>
          <Form.Item {...fieldItemProps('code', t('departments.form.fields.code'))} required>
            <Input id="code" name="code" onBlur={handleBlur} onChange={handleChange} value={values.code} />
          </Form.Item>
          <Form.Item htmlFor="description" label={t('departments.form.fields.description')}>
            <Input.TextArea
              id="description"
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              rows={3}
              value={values.description}
            />
          </Form.Item>

          <Flex gap="small" justify="end">
            <Button onClick={() => navigate(routes.departments.index)}>{t('common.cancel')}</Button>
            <Button htmlType="submit" loading={isPending} type="primary">
              {t('common.save')}
            </Button>
          </Flex>
        </Form>
      </Card>
    </div>
  )
}
