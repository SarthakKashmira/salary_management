import { Avatar, Flex, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import { avatarColorFor, STATUS_STYLES } from 'common/theme'
import Placeholder from 'components/common/Placeholder'
import RowActionsDropdown from 'components/common/RowActionsDropdown'
import routes from 'constants/routes'
import { buildUrl } from 'utils/url'

import { DATE_FORMAT } from './constants'

export const fullNameOf = ({ firstName, lastName }) => [firstName, lastName].filter(Boolean).join(' ')

export const initialsOf = ({ firstName, lastName }) =>
  `${firstName.charAt(0)}${(lastName ?? '').charAt(0)}`.toUpperCase()

export const avatarColorOf = ({ id }) => avatarColorFor(id)

export const formatAmount = (amount, symbol) => `${symbol}${Number(amount).toLocaleString()}`

export const buildColumns = (t, { onDelete, onEdit }) => [
  {
    key: 'employee',
    title: t('employees.columns.employee'),
    render: (_, employee) => (
      <Flex align="center" gap="small" justify="space-between">
        <Link style={{ color: 'inherit' }} to={buildUrl(routes.employees.show, { id: employee.id })}>
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
        <RowActionsDropdown onDelete={() => onDelete(employee)} onEdit={() => onEdit(employee)} />
      </Flex>
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
    render: (department) => department?.name ?? <Placeholder />,
  },
  {
    dataIndex: 'designation',
    key: 'designation',
    title: t('employees.columns.designation'),
    render: (designation) => designation ?? <Placeholder />,
  },
  {
    dataIndex: 'salary',
    key: 'salary',
    title: t('employees.columns.salary'),
    render: (salary) => (salary ? formatAmount(salary.amount, salary.currency.symbol) : <Placeholder />),
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
    render: (status) => <Tag style={STATUS_STYLES[status]}>{t(`common.status.${status}`)}</Tag>,
  },
]
