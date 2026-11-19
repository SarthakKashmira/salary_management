import { Table as AntTable } from 'antd'
import { isEmpty } from 'ramda'
import { useTranslation } from 'react-i18next'

import NoData from 'components/common/NoData'

import { buildColumns } from '../utils'

export default function Table({ onDeleteUser, onEditUser, pagination, users }) {
  const { t } = useTranslation()
  const { onChange, page, pageSize, totalCount } = pagination

  if (isEmpty(users)) return <NoData description={t('teamMembers.empty')} />

  return (
    <AntTable
      className="fill-table"
      columns={buildColumns(t, { onDelete: onDeleteUser, onEdit: onEditUser })}
      dataSource={users}
      pagination={{
        current: page,
        hideOnSinglePage: true,
        onChange,
        pageSize,
        showSizeChanger: false,
        total: totalCount,
      }}
      rowKey="id"
      scroll={{ x: 'max-content', y: 1 }}
    />
  )
}
