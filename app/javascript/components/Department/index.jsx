import { isEmpty } from 'ramda'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import DeleteModal from 'components/common/DeleteModal'
import Spinner from 'components/common/Spinner'
import routes from 'constants/routes'
import { useBulkDeleteDepartments, useFetchDepartments } from 'hooks/department'
import useDebounce from 'hooks/useDebounce'
import { buildUrl, getQueryParams } from 'utils/url'

import BlockedDeleteModal from './BlockedDeleteModal'
import Header from './Header'
import Table from './Table'

export default function Department() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { page = 1, searchTerm: activeSearchTerm = '' } = getQueryParams()

  const [searchTerm, setSearchTerm] = useState(activeSearchTerm)
  const [selectedIds, setSelectedIds] = useState([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [blockedDepartments, setBlockedDepartments] = useState([])
  const debouncedSearchTerm = useDebounce(searchTerm)

  useEffect(() => {
    if (debouncedSearchTerm === activeSearchTerm) return

    setSelectedIds([])
    navigate(buildUrl(routes.departments.index, { page: 1, searchTerm: debouncedSearchTerm }), { replace: true })
  }, [debouncedSearchTerm])

  const { data, isLoading } = useFetchDepartments({ page: Number(page), searchTerm: activeSearchTerm || undefined })

  const { departments = [], pageSize = 0, totalCount = 0 } = data ?? {}

  const { mutate: bulkDeleteDepartments, isPending: isBulkDeleting } = useBulkDeleteDepartments({
    onSuccess: ({ data: result }) => {
      setSelectedIds([])

      if (result.failedDepartments.length > 0) {
        setBlockedDepartments(result.failedDepartments)
      } else {
        toast.success(t('departments.bulkDelete.success'))
        setIsDeleteModalOpen(false)
      }
    },
  })

  const handlePageChange = (nextPage) => {
    setSelectedIds([])
    navigate(buildUrl(routes.departments.index, { page: nextPage, searchTerm: activeSearchTerm }))
  }

  const openDeleteModal = (ids) => {
    setSelectedIds(ids)
    setBlockedDepartments([])
    setIsDeleteModalOpen(true)
  }

  const handleEditDepartment = (department) => navigate(buildUrl(routes.departments.show, { id: department.id }))
  const handleDeleteDepartment = (department) => openDeleteModal([department.id])

  const hasBlockedDepartments = !isEmpty(blockedDepartments)

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
        departments={departments}
        onDeleteDepartment={handleDeleteDepartment}
        onEditDepartment={handleEditDepartment}
        onSelectionChange={setSelectedIds}
        pagination={{ onChange: handlePageChange, page: Number(page), pageSize, totalCount }}
        selectedRowKeys={selectedIds}
      />

      {hasBlockedDepartments ? (
        <BlockedDeleteModal
          departments={blockedDepartments}
          onCancel={() => setIsDeleteModalOpen(false)}
          open={isDeleteModalOpen}
        />
      ) : (
        <DeleteModal
          confirmLoading={isBulkDeleting}
          count={selectedIds.length}
          entityName="department"
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={() => bulkDeleteDepartments(selectedIds)}
          open={isDeleteModalOpen}
        />
      )}
    </>
  )
}
