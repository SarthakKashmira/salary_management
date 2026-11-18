import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Spinner from 'components/common/Spinner'
import routes from 'constants/routes'
import { useFetchDepartments } from 'hooks/department'
import useDebounce from 'hooks/useDebounce'
import { buildUrl, getQueryParams } from 'utils/url'

import Header from './Header'
import Table from './Table'

export default function Department() {
  const navigate = useNavigate()

  const { page = 1, searchTerm: activeSearchTerm = '' } = getQueryParams()

  const [searchTerm, setSearchTerm] = useState(activeSearchTerm)
  const debouncedSearchTerm = useDebounce(searchTerm)

  useEffect(() => {
    if (debouncedSearchTerm === activeSearchTerm) return

    navigate(buildUrl(routes.departments.index, { page: 1, searchTerm: debouncedSearchTerm }), { replace: true })
  }, [debouncedSearchTerm])

  const { data, isLoading } = useFetchDepartments({ page: Number(page), searchTerm: activeSearchTerm || undefined })

  const { departments = [], pageSize = 0, totalCount = 0 } = data ?? {}

  const handlePageChange = (nextPage) =>
    navigate(buildUrl(routes.departments.index, { page: nextPage, searchTerm: activeSearchTerm }))

  if (isLoading) return <Spinner />

  return (
    <>
      <Header onSearchChange={setSearchTerm} searchTerm={searchTerm} total={totalCount} />
      <Table
        departments={departments}
        pagination={{ onChange: handlePageChange, page: Number(page), pageSize, totalCount }}
      />
    </>
  )
}
