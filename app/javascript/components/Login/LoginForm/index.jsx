import { Button, Flex, Form, Input } from 'antd'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import routes from 'constants/routes'
import { useLogin } from 'hooks/auth'
import { persistSession } from 'utils/auth'

import { INITIAL_VALUES, VALIDATION_SCHEMA } from './constants'
import { getFieldStatus } from './utils'

export default function LoginForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { mutate: login, isPending } = useLogin({
    onSuccess: ({ data }) => {
      persistSession(data)
      toast.success(t('auth.login.success'))
      navigate(routes.root)
    },
  })

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: (values) => login({ session: values }),
    validationSchema: VALIDATION_SCHEMA,
  })

  const { handleBlur, handleChange, handleSubmit, values } = formik

  const fieldItemProps = (name, label, id = name) => ({ htmlFor: id, label, ...getFieldStatus(formik, name) })

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item {...fieldItemProps('email', t('auth.fields.email'), 'loginEmail')} required>
        <Input id="loginEmail" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} />
      </Form.Item>

      <Form.Item {...fieldItemProps('password', t('auth.fields.password'), 'loginPassword')} required>
        <Input.Password
          id="loginPassword"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
      </Form.Item>

      <Form.Item>
        <Button block htmlType="submit" loading={isPending} type="primary">
          {t('auth.login.submit')}
        </Button>
      </Form.Item>

      <Flex justify="end">
        <Link to={routes.forgotPassword}>{t('auth.login.forgotPassword')}</Link>
      </Flex>
    </Form>
  )
}
