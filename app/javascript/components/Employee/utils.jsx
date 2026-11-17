import { Avatar, Flex, Tag, Typography } from 'antd'
import dayjs from 'dayjs'

import { AVATAR_COLORS } from 'common/theme'

import { DATE_FORMAT, STATUS_STYLES } from './constants'

const fullNameOf = ({ firstName, lastName }) => [firstName, lastName].filter(Boolean).join(' ')

const initialsOf = ({ firstName, lastName }) => `${firstName.charAt(0)}${(lastName ?? '').charAt(0)}`.toUpperCase()

const avatarColorOf = ({ id }) => AVATAR_COLORS[id % AVATAR_COLORS.length]

const placeholder = <Typography.Text type="secondary">—</Typography.Text>

export const buildColumns = (t) => [
  {
    key: 'employee',
    title: t('employees.columns.employee'),
    render: (_, employee) => (
      <Flex align="center" gap="small">
        <Avatar style={{ backgroundColor: avatarColorOf(employee) }}>{initialsOf(employee)}</Avatar>
        <div className="min-w-0">
          <div>{fullNameOf(employee)}</div>
          <Typography.Text ellipsis type="secondary">
            {employee.email}
          </Typography.Text>
        </div>
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
    render: (department) => department ?? placeholder,
  },
  {
    dataIndex: 'designation',
    key: 'designation',
    title: t('employees.columns.designation'),
    render: (designation) => designation ?? placeholder,
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
