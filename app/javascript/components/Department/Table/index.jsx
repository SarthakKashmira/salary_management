import { Empty, Table as AntTable } from 'antd'
import { useTranslation } from 'react-i18next'

import { buildColumns } from '../utils'

export default function Table({ departments, pagination }) {
  const { t } = useTranslation()
  const { onChange, page, pageSize, totalCount } = pagination

  return (
    <AntTable
      columns={buildColumns(t)}
      dataSource={departments}
      locale={{ emptyText: <Empty description={t('departments.empty')} /> }}
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
