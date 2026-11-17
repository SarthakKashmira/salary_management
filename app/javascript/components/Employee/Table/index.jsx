import { Avatar, Empty, Flex, Table as AntTable, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { DATE_FORMAT } from '../constants'

const fullNameOf = ({ firstName, lastName }) => [firstName, lastName].filter(Boolean).join(' ')

const initialsOf = ({ firstName, lastName }) => `${firstName.charAt(0)}${(lastName ?? '').charAt(0)}`.toUpperCase()

export default function Table({ employees }) {
  const { t } = useTranslation()

  const columns = [
    {
      key: 'employee',
      title: t('employees.columns.employee'),
      render: (_, employee) => (
        <Flex align="center" gap="small">
          <Avatar>{initialsOf(employee)}</Avatar>
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
      render: (department) => department ?? <Typography.Text type="secondary">—</Typography.Text>,
    },
    {
      dataIndex: 'designation',
      key: 'designation',
      title: t('employees.columns.designation'),
      render: (designation) => designation ?? <Typography.Text type="secondary">—</Typography.Text>,
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
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>{t(`employees.status.${status}`)}</Tag>
      ),
    },
  ]

  return (
    <AntTable
      columns={columns}
      dataSource={employees}
      locale={{ emptyText: <Empty description={t('employees.empty')} /> }}
      pagination={false}
      rowKey="id"
      scroll={{ x: 'max-content' }}
    />
  )
}
