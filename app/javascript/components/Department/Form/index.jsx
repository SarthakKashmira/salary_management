import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import routes from 'constants/routes'
import { useCreateDepartment } from 'hooks/department'

import { INITIAL_VALUES, VALIDATION_SCHEMA } from './constants'
import { buildDepartmentPayload, getFieldStatus } from './utils'

export default function DepartmentForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { mutate: createDepartment, isPending } = useCreateDepartment({
    onSuccess: () => {
      toast.success(t('departments.form.createdSuccessfully'))
      navigate(routes.departments.index)
    },
  })

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => createDepartment(buildDepartmentPayload(values)),
  })

  const { handleBlur, handleChange, handleSubmit, values } = formik

  const fieldItemProps = (name, label) => ({ htmlFor: name, label, ...getFieldStatus(formik, name) })

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 4, marginTop: 0 }}>
        {t('departments.form.title')}
      </Typography.Title>
      <Typography.Text type="secondary">{t('departments.form.subtitle')}</Typography.Text>

      <Form layout="vertical" onFinish={handleSubmit} style={{ marginTop: 24 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...fieldItemProps('name', t('departments.form.fields.name'))} required>
              <Input id="name" name="name" onBlur={handleBlur} onChange={handleChange} value={values.name} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...fieldItemProps('code', t('departments.form.fields.code'))} required>
              <Input id="code" name="code" onBlur={handleBlur} onChange={handleChange} value={values.code} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
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
          </Col>
        </Row>

        <Form.Item>
          <Button htmlType="submit" loading={isPending} type="primary">
            {t('common.save')}
          </Button>
          <Button onClick={() => navigate(routes.departments.index)} style={{ marginInlineStart: 8 }}>
            {t('common.cancel')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
