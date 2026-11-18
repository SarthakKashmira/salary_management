import { Tag } from 'antd'

import { STATUS_STYLES } from 'common/theme'
import Placeholder from 'components/common/Placeholder'

export const fullNameOf = ({ firstName, lastName }) => [firstName, lastName].filter(Boolean).join(' ')

export const buildColumns = (t) => [
  {
    key: 'teamMember',
    title: t('teamMembers.columns.name'),
    render: (_, user) => fullNameOf(user),
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
