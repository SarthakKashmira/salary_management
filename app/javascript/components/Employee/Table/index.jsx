import { Table as AntTable } from 'antd'
import { isEmpty } from 'ramda'
import { useTranslation } from 'react-i18next'

import NoData from 'components/common/NoData'

import { buildColumns } from '../utils'

export default function Table({ employees, onDeleteEmployee, onEditEmployee, onSelectionChange, pagination, selectedRowKeys }) {
  const { t } = useTranslation()
  const { onChange, page, pageSize, totalCount } = pagination

  if (isEmpty(employees)) return <NoData description={t('employees.empty')} />

  return (
    <AntTable
      className="fill-table"
      columns={buildColumns(t, { onDelete: onDeleteEmployee, onEdit: onEditEmployee })}
      dataSource={employees}
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
      scroll={{ x: 'max-content', y: 1 }}
    />
  )
}
