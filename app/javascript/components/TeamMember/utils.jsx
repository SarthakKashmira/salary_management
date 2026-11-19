import { Flex, Tag } from 'antd'

import { STATUS_STYLES } from 'common/theme'
import Placeholder from 'components/common/Placeholder'
import RowActionsDropdown from 'components/common/RowActionsDropdown'

export const fullNameOf = ({ firstName, lastName }) => [firstName, lastName].filter(Boolean).join(' ')

export const buildColumns = (t, { onDelete, onEdit }) => [
  {
    key: 'teamMember',
    title: t('teamMembers.columns.name'),
    render: (_, user) => (
      <Flex align="center" gap="small" justify="space-between">
        <span>{fullNameOf(user)}</span>
        <RowActionsDropdown onDelete={() => onDelete(user)} onEdit={() => onEdit(user)} />
      </Flex>
    ),
  },
  {
    dataIndex: 'email',
    key: 'email',
    title: t('teamMembers.columns.email'),
  },
  {
    dataIndex: 'phone',
    key: 'phone',
    title: t('teamMembers.columns.phone'),
    render: (phone) => phone ?? <Placeholder />,
  },
  {
    dataIndex: 'role',
    key: 'role',
    title: t('teamMembers.columns.role'),
    render: (role) => t(`teamMembers.roles.${role}`),
  },
  {
    dataIndex: 'status',
    key: 'status',
    title: t('teamMembers.columns.status'),
    render: (status) => <Tag style={STATUS_STYLES[status]}>{t(`common.status.${status}`)}</Tag>,
  },
]
