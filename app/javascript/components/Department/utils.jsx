import dayjs from 'dayjs'

import Placeholder from 'components/common/Placeholder'

import { DATE_FORMAT } from './constants'

export const buildColumns = (t) => [
  {
    dataIndex: 'name',
    key: 'name',
    title: t('departments.columns.name'),
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
