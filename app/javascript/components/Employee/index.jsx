import { useMemo, useState } from 'react'

import Header from './Header'
import Table from './Table'
import { EMPLOYEES, SEARCHABLE_FIELDS } from './constants'

export default function Employee() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEmployees = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return EMPLOYEES

    return EMPLOYEES.filter((employee) =>
      SEARCHABLE_FIELDS.some((field) => employee[field]?.toLowerCase().includes(query))
    )
  }, [searchTerm])

  return (
    <>
      <Header onSearchChange={setSearchTerm} searchTerm={searchTerm} total={filteredEmployees.length} />
      <Table employees={filteredEmployees} />
    </>
  )
}
