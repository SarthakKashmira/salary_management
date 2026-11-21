import { useEffect, useState } from 'react'

import consumer from 'common/cable'

const useEmployeeImportProgress = (importId) => {
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    if (!importId) return undefined

    setProgress(null)

    const subscription = consumer.subscriptions.create(
      { channel: 'EmployeeImportChannel', import_id: importId },
      { received: (data) => setProgress(data) },
    )

    return () => subscription.unsubscribe()
  }, [importId])

  return progress
}

export default useEmployeeImportProgress
