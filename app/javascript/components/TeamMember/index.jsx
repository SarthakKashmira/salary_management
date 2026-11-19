import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import DeleteModal from 'components/common/DeleteModal'
import Spinner from 'components/common/Spinner'
import routes from 'constants/routes'
import useDebounce from 'hooks/useDebounce'
import { useDeleteUser, useFetchUsers } from 'hooks/user'
import { buildUrl, getQueryParams } from 'utils/url'

import Header from './Header'
import Table from './Table'

export default function TeamMember() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { page = 1, searchTerm: activeSearchTerm = '' } = getQueryParams()

  const [searchTerm, setSearchTerm] = useState(activeSearchTerm)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const debouncedSearchTerm = useDebounce(searchTerm)

  useEffect(() => {
    if (debouncedSearchTerm === activeSearchTerm) return

    navigate(buildUrl(routes.teamMembers.index, { page: 1, searchTerm: debouncedSearchTerm }), { replace: true })
  }, [debouncedSearchTerm])

  const { data, isLoading } = useFetchUsers({ page: Number(page), searchTerm: activeSearchTerm || undefined })

  const { users = [], pageSize = 0, totalCount = 0 } = data ?? {}

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser({
    onSuccess: () => {
      toast.success(t('teamMembers.deleteModal.success'))
      setSelectedUserId(null)
    },
  })

  const handlePageChange = (nextPage) =>
    navigate(buildUrl(routes.teamMembers.index, { page: nextPage, searchTerm: activeSearchTerm }))

  const handleEditUser = (user) => navigate(buildUrl(routes.teamMembers.edit, { id: user.id }))
  const handleDeleteUser = (user) => setSelectedUserId(user.id)

  if (isLoading) return <Spinner />

  return (
    <>
      <Header onSearchChange={setSearchTerm} searchTerm={searchTerm} total={totalCount} />
      <Table
        onDeleteUser={handleDeleteUser}
        onEditUser={handleEditUser}
        pagination={{ onChange: handlePageChange, page: Number(page), pageSize, totalCount }}
        users={users}
      />

      <DeleteModal
        confirmLoading={isDeleting}
        count={1}
        description={t('teamMembers.deleteModal.description')}
        entityName="team member"
        onCancel={() => setSelectedUserId(null)}
        onConfirm={() => deleteUser(selectedUserId)}
        open={Boolean(selectedUserId)}
      />
    </>
  )
}
