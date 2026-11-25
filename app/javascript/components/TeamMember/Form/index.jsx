import { Button, Col, Form, Input, Row, Select, Typography } from 'antd'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import Spinner from 'components/common/Spinner'
import routes from 'constants/routes'
import { useCreateUser, useShowUser, useUpdateUser } from 'hooks/user'

import { ROLES } from '../constants'
import { INITIAL_VALUES, VALIDATION_SCHEMA } from './constants'
import { buildInitialValuesFromUser, buildUserPayload, buildUserUpdatePayload, getFieldStatus } from './utils'

export default function TeamMemberForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const roleOptions = ROLES.map((role) => ({ label: t(`teamMembers.roles.${role}`), value: role }))

  const { data: user, isLoading: isUserLoading } = useShowUser(id)

  const { mutate: createUser, isPending: isCreating } = useCreateUser({
    onSuccess: ({ data }) => {
      toast.success(t('teamMembers.form.invitedSuccessfully', { email: data.email }))
      navigate(routes.teamMembers.index)
    },
  })

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser({
    onSuccess: () => {
      toast.success(t('teamMembers.form.edit.updatedSuccessfully'))
      navigate(routes.teamMembers.index)
    },
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isEdit ? (user ? buildInitialValuesFromUser(user) : {}) : INITIAL_VALUES,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) =>
      isEdit ? updateUser({ id, payload: buildUserUpdatePayload(values) }) : createUser(buildUserPayload(values)),
  })

  const { handleBlur, handleChange, handleSubmit, setFieldTouched, setFieldValue, values } = formik

  const fieldItemProps = (name, label) => ({ htmlFor: name, label, ...getFieldStatus(formik, name) })

  if (isEdit && isUserLoading) return <Spinner />

  const isPending = isCreating || isUpdating

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 4, marginTop: 0 }}>
        {t(isEdit ? 'teamMembers.form.edit.title' : 'teamMembers.form.title')}
      </Typography.Title>
      <Typography.Text type="secondary">
        {t(isEdit ? 'teamMembers.form.edit.subtitle' : 'teamMembers.form.subtitle')}
      </Typography.Text>

      <Form layout="vertical" onFinish={handleSubmit} style={{ marginTop: 24 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...fieldItemProps('firstName', t('teamMembers.form.fields.firstName'))} required>
              <Input id="firstName" name="firstName" onBlur={handleBlur} onChange={handleChange} value={values.firstName} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...fieldItemProps('lastName', t('teamMembers.form.fields.lastName'))}>
              <Input id="lastName" name="lastName" onBlur={handleBlur} onChange={handleChange} value={values.lastName} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...fieldItemProps('email', t('teamMembers.form.fields.email'))} required>
              <Input
                disabled={isEdit}
                id="email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...fieldItemProps('phone', t('teamMembers.form.fields.phone'))}>
              <Input id="phone" name="phone" onBlur={handleBlur} onChange={handleChange} value={values.phone} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item {...fieldItemProps('role', t('teamMembers.form.fields.role'))} required>
          <Select
            id="role"
            onBlur={() => setFieldTouched('role', true)}
            onChange={(value) => setFieldValue('role', value)}
            options={roleOptions}
            placeholder={t('teamMembers.form.placeholders.role')}
            style={{ maxWidth: 'calc(50% - 8px)' }}
            value={values.role}
          />
        </Form.Item>

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
