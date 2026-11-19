import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import DeleteModal from 'components/common/DeleteModal'
import Spinner from 'components/common/Spinner'
import routes from 'constants/routes'
import useDebounce from 'hooks/useDebounce'
import { useBulkDeleteEmployees, useFetchEmployees } from 'hooks/useEmployeeApi'
import { buildUrl, getQueryParams } from 'utils/url'

import Header from './Header'
import Table from './Table'

export default function Employee() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { page = 1, searchTerm: activeSearchTerm = '' } = getQueryParams()

  const [searchTerm, setSearchTerm] = useState(activeSearchTerm)
  const [selectedIds, setSelectedIds] = useState([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm)

  useEffect(() => {
    if (debouncedSearchTerm === activeSearchTerm) return

    setSelectedIds([])
    navigate(buildUrl(routes.employees.index, { page: 1, searchTerm: debouncedSearchTerm }), { replace: true })
  }, [debouncedSearchTerm])

  const { data, isLoading } = useFetchEmployees({ page: Number(page), searchTerm: activeSearchTerm || undefined })

  const { employees = [], pageSize = 0, totalCount = 0 } = data ?? {}

  const { mutate: bulkDeleteEmployees, isPending: isBulkDeleting } = useBulkDeleteEmployees({
    onSuccess: () => {
      toast.success(t('employees.bulkDelete.success'))
      setSelectedIds([])
      setIsDeleteModalOpen(false)
    },
  })

  const handlePageChange = (nextPage) => {
    setSelectedIds([])
    navigate(buildUrl(routes.employees.index, { page: nextPage, searchTerm: activeSearchTerm }))
  }

  // Shared by the header's bulk-delete button and each row's own delete action -
  // a row delete is just a bulk delete of one id.
  const openDeleteModal = (ids) => {
    setSelectedIds(ids)
    setIsDeleteModalOpen(true)
  }

  const handleEditEmployee = (employee) => navigate(buildUrl(routes.employees.edit, { id: employee.id }))
  const handleDeleteEmployee = (employee) => openDeleteModal([employee.id])

  if (isLoading) return <Spinner />

  return (
    <>
      <Header
        isBulkDeleting={isBulkDeleting}
        onOpenDeleteModal={() => openDeleteModal(selectedIds)}
        onSearchChange={setSearchTerm}
        searchTerm={searchTerm}
        selectedCount={selectedIds.length}
        total={totalCount}
      />
      <Table
        employees={employees}
        onDeleteEmployee={handleDeleteEmployee}
        onEditEmployee={handleEditEmployee}
        onSelectionChange={setSelectedIds}
        pagination={{ onChange: handlePageChange, page: Number(page), pageSize, totalCount }}
        selectedRowKeys={selectedIds}
      />

      <DeleteModal
        confirmLoading={isBulkDeleting}
        count={selectedIds.length}
        entityName="employee"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => bulkDeleteEmployees(selectedIds)}
        open={isDeleteModalOpen}
      />
    </>
  )
}
