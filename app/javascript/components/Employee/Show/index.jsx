import { BankOutlined, EditOutlined, GlobalOutlined, MailOutlined, PhoneOutlined, WalletOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Divider, Flex, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import Spinner from 'components/common/Spinner'
import routes from 'constants/routes'
import { useShowEmployee } from 'hooks/useEmployeeApi'
import { buildUrl } from 'utils/url'

import { DATE_FORMAT, STATUS_STYLES } from '../constants'
import { avatarColorOf, fullNameOf, initialsOf } from '../utils'
import { formatAmount } from './utils'

const DetailRow = ({ icon, children }) => (
  <Flex align="center" gap="small">
    {icon}
    <Typography.Text>{children}</Typography.Text>
  </Flex>
)

export default function EmployeeShow() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: employee, isLoading } = useShowEmployee(id)

  if (isLoading) return <Spinner />

  const { salary } = employee

  return (
    <div style={{ maxWidth: 720 }}>
      <Flex align="center" className="mb-4" justify="space-between">
        <Typography.Title level={3} style={{ margin: 0 }}>
          {fullNameOf(employee)}
        </Typography.Title>
        <Button icon={<EditOutlined />} onClick={() => navigate(buildUrl(routes.employees.edit, { id }))}>
          {t('common.edit')}
        </Button>
      </Flex>

      <Card>
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          {t('employees.show.employeeDetails')}
        </Typography.Title>
        <Flex gap="middle">
          <Avatar size={72} style={{ backgroundColor: avatarColorOf(employee), flexShrink: 0, fontSize: 24 }}>
            {initialsOf(employee)}
          </Avatar>
          <Flex gap={4} vertical>
            <Flex align="center" gap="small">
              <Typography.Title level={4} style={{ margin: 0 }}>
                {fullNameOf(employee)}
              </Typography.Title>
              <Tag style={STATUS_STYLES[employee.status]}>{t(`employees.status.${employee.status}`)}</Tag>
            </Flex>
            <Typography.Text type="secondary">{employee.employeeId}</Typography.Text>
            <DetailRow icon={<MailOutlined />}>{employee.email}</DetailRow>
            <DetailRow icon={<PhoneOutlined />}>{employee.phone ?? '—'}</DetailRow>
            <DetailRow icon={<BankOutlined />}>
              {[employee.department, employee.designation].filter(Boolean).join(' – ') || '—'}
            </DetailRow>
            <DetailRow icon={<GlobalOutlined />}>{employee.country?.name ?? '—'}</DetailRow>
          </Flex>
        </Flex>

        <Divider />

        <Typography.Title level={5}>{t('employees.show.salaryInformation')}</Typography.Title>
        {salary ? (
          <Flex gap="large" wrap="wrap">
            <DetailRow icon={<WalletOutlined />}>
              {formatAmount(salary.amount, salary.currency.symbol)} {t('employees.show.perAnnum')}
            </DetailRow>
            <Typography.Text type="secondary">
              {t('employees.show.effectiveFrom')}: {dayjs(salary.effectiveFrom).format(DATE_FORMAT)}
            </Typography.Text>
          </Flex>
        ) : (
          <Typography.Text type="secondary">{t('employees.show.noSalary')}</Typography.Text>
        )}
      </Card>
    </div>
  )
}
