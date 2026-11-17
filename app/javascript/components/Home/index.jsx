import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import classnames from 'classnames'

export default function Home() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('loading...')

  useEffect(() => {
    fetch('/up')
      .then((res) => {
        const ok = res.ok
        setStatus(ok ? 'Rails backend is up' : 'Rails backend returned an error')
        if (ok) toast.success('Connected to Rails')
      })
      .catch(() => setStatus('Could not reach Rails backend'))
  }, [])

  return (
    <div className={classnames('p-8', 'font-sans')}>
      <h1 className="text-3xl font-bold text-slate-900">{t('app.name')}</h1>
      <p className="mt-2 text-slate-600">{status}</p>
    </div>
  )
}
