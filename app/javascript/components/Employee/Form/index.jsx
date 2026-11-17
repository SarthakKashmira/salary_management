import { Button, Col, DatePicker, Divider, Flex, Form, Input, Row, Select, Switch, Typography } from 'antd'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import routes from 'constants/routes'
import { useFetchCountries } from 'hooks/country'
import { useFetchCurrencies } from 'hooks/currency'
import { useFetchDepartments } from 'hooks/department'
import { useCreateEmployee } from 'hooks/useEmployeeApi'

import { INITIAL_VALUES, VALIDATION_SCHEMA } from './constants'
import { buildEmployeePayload, buildSelectOptions, getFieldStatus } from './utils'

export default function EmployeeForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const submitIntentRef = useRef("save")

  const { data: countries = [], isLoading: isCountriesLoading } = useFetchCountries()
  const { data: currencies = [], isLoading: isCurrenciesLoading } = useFetchCurrencies()
  const { data: departments = [], isLoading: isDepartmentsLoading } = useFetchDepartments()

  const countryOptions = buildSelectOptions(countries)
  const currencyOptions = buildSelectOptions(currencies, ({ symbol, code }) => `${symbol} ${code}`)
  const departmentOptions = buildSelectOptions(departments)

  const { mutate: createEmployee, isPending } = useCreateEmployee({
    onSuccess: () => {
      toast.success(t('employees.form.createdSuccessfully'))

      if (submitIntentRef.current === "saveAndAddAnother") {
        formik.resetForm({ values: { ...INITIAL_VALUES, joiningDate: dayjs() } })
      } else {
        navigate(routes.employees.index)
      }
    },
  })

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => createEmployee(buildEmployeePayload(values)),
  })

  const { handleBlur, handleChange, handleSubmit, setFieldTouched, setFieldValue, values } = formik

  const fieldItemProps = (name, label) => ({ htmlFor: name, label, ...getFieldStatus(formik, name) })
  const selectFieldProps = (name) => ({ onBlur: () => setFieldTouched(name, true), onChange: (value) => setFieldValue(name, value) })

  const handleSaveAndAddAnother = () => {
    submitIntentRef.current = "saveAndAddAnother"
    handleSubmit()
  }

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 4, marginTop: 0 }}>
        {t('employees.form.title')}
      </Typography.Title>
      <Typography.Text type="secondary">{t('employees.form.subtitle')}</Typography.Text>

      <Form layout="vertical" onFinish={handleSubmit} style={{ marginTop: 24 }}>
        <Divider titlePlacement="left">
          {t('employees.form.employeeDetails')}
        </Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...fieldItemProps('firstName', t('employees.form.fields.firstName'))} required>
              <Input id="firstName" name="firstName" onBlur={handleBlur} onChange={handleChange} value={values.firstName} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item htmlFor="lastName" label={t('employees.form.fields.lastName')}>
              <Input id="lastName" name="lastName" onBlur={handleBlur} onChange={handleChange} value={values.lastName} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...fieldItemProps('email', t('employees.form.fields.email'))} required>
              <Input id="email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item htmlFor="phone" label={t('employees.form.fields.phone')}>
              <Input id="phone" name="phone" onBlur={handleBlur} onChange={handleChange} value={values.phone} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...fieldItemProps('employeeId', t('employees.form.fields.employeeId'))} required>
              <Input id="employeeId" name="employeeId" onBlur={handleBlur} onChange={handleChange} value={values.employeeId} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item htmlFor="jobTitle" label={t('employees.form.fields.jobTitle')}>
              <Input id="jobTitle" name="jobTitle" onBlur={handleBlur} onChange={handleChange} value={values.jobTitle} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item htmlFor="departmentId" label={t('employees.form.fields.department')}>
              <Select
                allowClear
                id="departmentId"
                {...selectFieldProps('departmentId')}
                loading={isDepartmentsLoading}
                options={departmentOptions}
                placeholder={t('employees.form.placeholders.department')}
                value={values.departmentId}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...fieldItemProps('countryId', t('employees.form.fields.country'))} required>
              <Select
                id="countryId"
                {...selectFieldProps('countryId')}
                loading={isCountriesLoading}
                options={countryOptions}
                placeholder={t('employees.form.placeholders.country')}
                value={values.countryId}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...fieldItemProps('joiningDate', t('employees.form.fields.joiningDate'))} required>
              <DatePicker
                id="joiningDate"
                onBlur={() => setFieldTouched('joiningDate', true)}
                onChange={(date) => setFieldValue('joiningDate', date)}
                style={{ width: '100%' }}
                value={values.joiningDate ? dayjs(values.joiningDate) : null}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item htmlFor="isActive" label={t('employees.form.fields.status')}>
              <Switch
                checked={values.isActive}
                id="isActive"
                checkedChildren={t('employees.status.active')}
                onChange={(checked) => setFieldValue('isActive', checked)}
                unCheckedChildren={t('employees.status.inactive')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider titlePlacement="left">
          {t('employees.form.salaryDetails')}
        </Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...fieldItemProps('currencyId', t('employees.form.fields.currency'))} required>
              <Select
                id="currencyId"
                {...selectFieldProps('currencyId')}
                loading={isCurrenciesLoading}
                options={currencyOptions}
                placeholder={t('employees.form.placeholders.currency')}
                value={values.currencyId}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...fieldItemProps('amount', t('employees.form.fields.amount'))} required>
              <Input id="amount" inputMode="decimal" name="amount" onBlur={handleBlur} onChange={handleChange} value={values.amount} />
            </Form.Item>
          </Col>
        </Row>

        <Flex gap="small" justify="end">
          <Button onClick={() => navigate(routes.employees.index)}>{t('common.cancel')}</Button>
          <Button loading={isPending} onClick={handleSaveAndAddAnother}>
            {t('common.saveAndAddAnother')}
          </Button>
          <Button htmlType="submit" loading={isPending} onClick={() => (submitIntentRef.current = 'save')} type="primary">
            {t('common.save')}
          </Button>
        </Flex>
      </Form>
    </div>
  )
}
