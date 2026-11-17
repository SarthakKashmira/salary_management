import { BankOutlined, EditOutlined, GlobalOutlined, MailOutlined, PhoneOutlined, WalletOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, ConfigProvider, Divider, Flex, Grid, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import Spinner from 'components/common/Spinner'
import routes from 'constants/routes'
import { useShowEmployee } from 'hooks/useEmployeeApi'
import { buildUrl } from 'utils/url'

import { DATE_FORMAT, STATUS_STYLES } from '../constants'
import { avatarColorOf, formatAmount, fullNameOf, initialsOf } from '../utils'

const { useBreakpoint } = Grid

const DetailRow = ({ icon, children }) => (
  <Flex align="center" gap="small">
    {icon}
    <Typography.Text>{children}</Typography.Text>
  </Flex>
)

// A little larger than the app default everywhere, and larger again once there's
// room for it - this page has fewer, bigger blocks of information than a table,
// so it can afford to read more like a profile than a dense data screen.
const TYPOGRAPHY_TOKENS = {
  base: { fontSize: 15, fontSizeHeading3: 26, fontSizeHeading4: 22, fontSizeHeading5: 17 },
  large: { fontSize: 16, fontSizeHeading3: 30, fontSizeHeading4: 24, fontSizeHeading5: 18 },
}

export default function EmployeeShow() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const screens = useBreakpoint()

  const { data: employee, isLoading } = useShowEmployee(id)

  if (isLoading) return <Spinner />

  const { salary } = employee
  const isLarge = Boolean(screens.xl)
  const avatarSize = isLarge ? 88 : 72

  return (
    <ConfigProvider theme={{ token: isLarge ? TYPOGRAPHY_TOKENS.large : TYPOGRAPHY_TOKENS.base }}>
      <div>
        <Flex align="center" className="mb-4" justify="space-between">
          <Typography.Title level={3} style={{ margin: 0 }}>
            {fullNameOf(employee)}
          </Typography.Title>
          <Button icon={<EditOutlined />} onClick={() => navigate(buildUrl(routes.employees.edit, { id }))}>
            {t('common.edit')}
          </Button>
        </Flex>

        <Card styles={{ body: { paddingBlock: isLarge ? 32 : 24, paddingInline: isLarge ? 40 : 28 } }}>
          <Typography.Title level={5} style={{ marginTop: 0 }}>
            {t('employees.show.employeeDetails')}
          </Typography.Title>
          <Flex align="center" gap={isLarge ? 40 : 32}>
            <Avatar
              size={avatarSize}
              style={{ backgroundColor: avatarColorOf(employee), flexShrink: 0, fontSize: avatarSize / 3 }}
            >
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
    </ConfigProvider>
  )
}
