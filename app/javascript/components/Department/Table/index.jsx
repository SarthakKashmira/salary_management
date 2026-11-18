import { Table as AntTable } from 'antd'
import { isEmpty } from 'ramda'
import { useTranslation } from 'react-i18next'

import NoData from 'components/common/NoData'

import { buildColumns } from '../utils'

export default function Table({ departments, onSelectionChange, pagination, selectedRowKeys }) {
  const { t } = useTranslation()
  const { onChange, page, pageSize, totalCount } = pagination

  if (isEmpty(departments)) return <NoData description={t('departments.empty')} />

  return (
    <AntTable
      columns={buildColumns(t)}
      dataSource={departments}
      pagination={{
        current: page,
        hideOnSinglePage: true,
        onChange,
        pageSize,
        showSizeChanger: false,
        total: totalCount,
      }}
      rowKey="id"
      rowSelection={{ onChange: onSelectionChange, selectedRowKeys }}
      scroll={{ x: 'max-content' }}
    />
  )
}
