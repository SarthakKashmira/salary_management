import { Empty, Table as AntTable } from 'antd'
import { useTranslation } from 'react-i18next'

import { buildColumns } from '../utils'

export default function Table({ employees, pagination }) {
  const { t } = useTranslation()
  const { onChange, page, pageSize, totalCount } = pagination

  return (
    <AntTable
      columns={buildColumns(t)}
      dataSource={employees}
      locale={{ emptyText: <Empty description={t('employees.empty')} /> }}
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
