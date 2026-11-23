import { useEffect, useState } from 'react'

import consumer from 'common/cable'

const useProgress = (channel, paramKey, paramValue) => {
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    if (!paramValue) return undefined

    setProgress(null)

    const subscription = consumer.subscriptions.create(
      { channel, [paramKey]: paramValue },
      { received: (data) => setProgress(data) },
    )

    return () => subscription.unsubscribe()
  }, [paramValue])

  return progress
}

export default useProgress
