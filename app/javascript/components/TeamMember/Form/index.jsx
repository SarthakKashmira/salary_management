import { Button, Col, Form, Input, Row, Select, Switch, Typography } from 'antd'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import routes from 'constants/routes'
import { useCreateUser } from 'hooks/user'

import { ROLES } from '../constants'
import { INITIAL_VALUES, VALIDATION_SCHEMA } from './constants'
import { buildUserPayload, getFieldStatus } from './utils'

export default function TeamMemberForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const roleOptions = ROLES.map((role) => ({ label: t(`teamMembers.roles.${role}`), value: role }))

  const { mutate: createUser, isPending } = useCreateUser({
    onSuccess: () => {
      toast.success(t('teamMembers.form.createdSuccessfully'))
      navigate(routes.teamMembers.index)
    },
  })

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => createUser(buildUserPayload(values)),
  })

  const { handleBlur, handleChange, handleSubmit, setFieldTouched, setFieldValue, values } = formik

  const fieldItemProps = (name, label) => ({ htmlFor: name, label, ...getFieldStatus(formik, name) })

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 4, marginTop: 0 }}>
        {t('teamMembers.form.title')}
      </Typography.Title>
      <Typography.Text type="secondary">{t('teamMembers.form.subtitle')}</Typography.Text>

      <Form layout="vertical" onFinish={handleSubmit} style={{ marginTop: 24 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...fieldItemProps('firstName', t('teamMembers.form.fields.firstName'))} required>
              <Input id="firstName" name="firstName" onBlur={handleBlur} onChange={handleChange} value={values.firstName} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...fieldItemProps('lastName', t('teamMembers.form.fields.lastName'))} required>
              <Input id="lastName" name="lastName" onBlur={handleBlur} onChange={handleChange} value={values.lastName} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...fieldItemProps('email', t('teamMembers.form.fields.email'))} required>
              <Input id="email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...fieldItemProps('phone', t('teamMembers.form.fields.phone'))} required>
              <Input id="phone" name="phone" onBlur={handleBlur} onChange={handleChange} value={values.phone} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...fieldItemProps('role', t('teamMembers.form.fields.role'))} required>
              <Select
                id="role"
                onBlur={() => setFieldTouched('role', true)}
                onChange={(value) => setFieldValue('role', value)}
                options={roleOptions}
                placeholder={t('teamMembers.form.placeholders.role')}
                value={values.role}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item htmlFor="isActive" label={t('teamMembers.form.fields.status')}>
              <Switch
                checked={values.isActive}
                checkedChildren={t('common.status.active')}
                id="isActive"
                onChange={(checked) => setFieldValue('isActive', checked)}
                unCheckedChildren={t('common.status.inactive')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button htmlType="submit" loading={isPending} type="primary">
            {t('common.save')}
          </Button>
          <Button onClick={() => navigate(routes.teamMembers.index)} style={{ marginInlineStart: 8 }}>
            {t('common.cancel')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
