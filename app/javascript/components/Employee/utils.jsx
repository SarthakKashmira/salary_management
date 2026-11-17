import { Avatar, Flex, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import { AVATAR_COLORS } from 'common/theme'
import routes from 'constants/routes'
import { buildUrl } from 'utils/url'

import { DATE_FORMAT, STATUS_STYLES } from './constants'

export const fullNameOf = ({ firstName, lastName }) => [firstName, lastName].filter(Boolean).join(' ')

export const initialsOf = ({ firstName, lastName }) =>
  `${firstName.charAt(0)}${(lastName ?? '').charAt(0)}`.toUpperCase()

export const avatarColorOf = ({ id }) => AVATAR_COLORS[id % AVATAR_COLORS.length]

export const formatAmount = (amount, symbol) => `${symbol}${Number(amount).toLocaleString()}`

const placeholder = <Typography.Text type="secondary">—</Typography.Text>

export const buildColumns = (t) => [
  {
    key: 'employee',
    title: t('employees.columns.employee'),
    render: (_, employee) => (
      <Link style={{ color: 'inherit', display: 'block' }} to={buildUrl(routes.employees.show, { id: employee.id })}>
        <Flex align="center" gap="small">
          <Avatar style={{ backgroundColor: avatarColorOf(employee) }}>{initialsOf(employee)}</Avatar>
          <div className="min-w-0">
            <div>{fullNameOf(employee)}</div>
            <Typography.Text ellipsis type="secondary">
              {employee.email}
            </Typography.Text>
          </div>
        </Flex>
      </Link>
    ),
  },
  {
    dataIndex: 'employeeId',
    key: 'employeeId',
    title: t('employees.columns.employeeId'),
  },
  {
    dataIndex: 'department',
    key: 'department',
    title: t('employees.columns.department'),
    render: (department) => department ?? placeholder,
  },
  {
    dataIndex: 'designation',
    key: 'designation',
    title: t('employees.columns.designation'),
    render: (designation) => designation ?? placeholder,
  },
  {
    dataIndex: 'salary',
    key: 'salary',
    title: t('employees.columns.salary'),
    render: (salary) => (salary ? formatAmount(salary.amount, salary.currency.symbol) : placeholder),
  },
  {
    dataIndex: 'joiningDate',
    key: 'joiningDate',
    title: t('employees.columns.joiningDate'),
    render: (joiningDate) => dayjs(joiningDate).format(DATE_FORMAT),
  },
  {
    dataIndex: 'status',
    key: 'status',
    title: t('employees.columns.status'),
    render: (status) => <Tag style={STATUS_STYLES[status]}>{t(`employees.status.${status}`)}</Tag>,
  },
]
