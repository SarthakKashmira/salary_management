import { useEffect, useState } from 'react'

export default function HomePage() {
  const [status, setStatus] = useState('loading...')

  useEffect(() => {
    fetch('/up')
      .then((res) => setStatus(res.ok ? 'Rails backend is up' : 'Rails backend returned an error'))
      .catch(() => setStatus('Could not reach Rails backend'))
  }, [])

  return (
    <div>
      <h1>Salary Management</h1>
      <p>{status}</p>
    </div>
  )
}
