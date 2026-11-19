import { Flex } from 'antd'
import dayjs from 'dayjs'

import Placeholder from 'components/common/Placeholder'
import RowActionsDropdown from 'components/common/RowActionsDropdown'

import { DATE_FORMAT } from './constants'

export const buildColumns = (t, { onDelete, onEdit }) => [
  {
    dataIndex: 'name',
    key: 'name',
    title: t('departments.columns.name'),
    render: (name, department) => (
      <Flex align="center" gap="small" justify="space-between">
        <span>{name}</span>
        <RowActionsDropdown onDelete={() => onDelete(department)} onEdit={() => onEdit(department)} />
      </Flex>
    ),
  },
  {
    dataIndex: 'description',
    key: 'description',
    title: t('departments.columns.description'),
    render: (description) => description ?? <Placeholder />,
  },
  {
    dataIndex: 'code',
    key: 'code',
    title: t('departments.columns.code'),
  },
  {
    dataIndex: 'createdAt',
    key: 'createdAt',
    title: t('departments.columns.createdAt'),
    render: (createdAt) => dayjs(createdAt).format(DATE_FORMAT),
  },
]
