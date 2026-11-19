import { useState } from 'react'
import { Col, Flex, Row, Select, Typography } from 'antd'
import { gt } from 'ramda'
import { useTranslation } from 'react-i18next'

import Spinner from 'components/common/Spinner'
import { useFetchCurrencies } from 'hooks/currency'
import { useFetchSummary } from 'hooks/summary'

import StatCard from './StatCard'
import { buildSummaryCards } from './utils'

export default function Summary() {
  const { t } = useTranslation()
  const { data: currencies = [], isLoading: isCurrenciesLoading } = useFetchCurrencies()
  const [currencyCode, setCurrencyCode] = useState(null)

  const selectedCurrencyCode = currencyCode ?? currencies[0]?.code
  const { data, isLoading: isSummaryLoading } = useFetchSummary(selectedCurrencyCode)

  if (isCurrenciesLoading || isSummaryLoading) return <Spinner />

  const { totalEmployees = 0, employeesWithSalary = 0, currency, max, min, average, median, total } = data ?? {}
  const hasSalaryData = gt(employeesWithSalary, 0)
  const cards = hasSalaryData
    ? buildSummaryCards(t, { totalEmployees, currency, max, min, average, median, total })
    : [{ key: 'totalEmployees', label: t('summary.cards.totalEmployees'), value: totalEmployees.toLocaleString() }]

  const currencyOptions = currencies.map((option) => ({ label: `${option.symbol} ${option.code}`, value: option.code }))

  return (
    <>
      <Flex align="flex-start" gap="middle" justify="space-between" wrap="wrap">
        <div>
          <Typography.Title level={3} style={{ marginBottom: 4, marginTop: 0 }}>
            {t('summary.title')}
          </Typography.Title>
          <Typography.Text type="secondary">{t('summary.subtitle')}</Typography.Text>
        </div>

        <Select
          onChange={setCurrencyCode}
          options={currencyOptions}
          style={{ width: 120 }}
          value={selectedCurrencyCode}
        />
      </Flex>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {cards.map((card) => (
          <Col key={card.key} md={8} sm={12} xs={24}>
            <StatCard label={card.label} value={card.value} />
          </Col>
        ))}
      </Row>

      {!hasSalaryData && (
        <Typography.Text style={{ display: 'block', marginTop: 16 }} type="secondary">
          {t('summary.noSalaryData')}
        </Typography.Text>
      )}
    </>
  )
}
