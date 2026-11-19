import { Button, Col, Form, Input, Row } from 'antd'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import routes from 'constants/routes'
import { useRegister } from 'hooks/auth'
import { persistSession } from 'utils/auth'

import { buildInitialValues, VALIDATION_SCHEMA } from './constants'
import { buildRegistrationPayload, getFieldStatus } from './utils'

export default function RegisterForm({ invitedEmail }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { mutate: register, isPending } = useRegister({
    onSuccess: ({ data }) => {
      persistSession(data)
      toast.success(t('auth.register.success'))
      navigate(routes.root)
    },
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: buildInitialValues(invitedEmail ?? ''),
    onSubmit: (values) => register(buildRegistrationPayload(values)),
    validationSchema: VALIDATION_SCHEMA,
  })

  const { handleBlur, handleChange, handleSubmit, values } = formik

  const fieldItemProps = (name, label, id = name) => ({ htmlFor: id, label, ...getFieldStatus(formik, name) })

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item {...fieldItemProps('firstName', t('auth.fields.firstName'), 'registerFirstName')} required>
            <Input
              id="registerFirstName"
              name="firstName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item {...fieldItemProps('lastName', t('auth.fields.lastName'), 'registerLastName')} required>
            <Input
              id="registerLastName"
              name="lastName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item {...fieldItemProps('email', t('auth.fields.email'), 'registerEmail')} required>
        <Input
          disabled={Boolean(invitedEmail)}
          id="registerEmail"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
        />
      </Form.Item>

      <Form.Item {...fieldItemProps('phone', t('auth.fields.phone'), 'registerPhone')}>
        <Input id="registerPhone" name="phone" onBlur={handleBlur} onChange={handleChange} value={values.phone} />
      </Form.Item>

      <Form.Item {...fieldItemProps('password', t('auth.fields.password'), 'registerPassword')} required>
        <Input.Password
          id="registerPassword"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
      </Form.Item>

      <Form.Item>
        <Button block htmlType="submit" loading={isPending} type="primary">
          {t('auth.register.submit')}
        </Button>
      </Form.Item>
    </Form>
  )
}
