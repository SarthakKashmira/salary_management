import { formatAmount } from 'components/Employee/utils'

// Everything is already expressed in the one currency the caller selected,
// so this is just one flat set of cards - no per-currency grouping needed.
export const buildSummaryCards = (t, { totalEmployees, currency, max, min, average, median, total }) => [
  { key: 'totalEmployees', label: t('summary.cards.totalEmployees'), value: totalEmployees.toLocaleString() },
  { key: 'max', label: t('summary.cards.maxSalary'), value: formatAmount(max, currency.symbol) },
  { key: 'min', label: t('summary.cards.minSalary'), value: formatAmount(min, currency.symbol) },
  { key: 'average', label: t('summary.cards.averageSalary'), value: formatAmount(average, currency.symbol) },
  { key: 'median', label: t('summary.cards.medianSalary'), value: formatAmount(median, currency.symbol) },
  { key: 'total', label: t('summary.cards.totalSalaryCost'), value: formatAmount(total, currency.symbol) },
]
