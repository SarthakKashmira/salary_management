import { Empty, Table as AntTable } from 'antd'
import { useTranslation } from 'react-i18next'

import { buildColumns } from '../utils'

export default function Table({ users, pagination }) {
  const { t } = useTranslation()
  const { onChange, page, pageSize, totalCount } = pagination

  return (
    <AntTable
      columns={buildColumns(t)}
      dataSource={users}
      locale={{ emptyText: <Empty description={t('teamMembers.empty')} /> }}
      pagination={{
        current: page,
        hideOnSinglePage: true,
        onChange,
        pageSize,
        showSizeChanger: false,
        total: totalCount,
      }}
      rowKey="id"
      scroll={{ x: 'max-content' }}
    />
  )
}
