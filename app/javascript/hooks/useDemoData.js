import demoDataApi from 'apis/demoData'
import QUERY_KEYS from 'constants/queryKeys'
import useMutationWithInvalidation from 'hooks/useMutationWithInvalidation'

// Seeding/clearing touches every entity in the app, not just one - so every
// query key gets invalidated, not a single one like other mutations do.
const ALL_QUERY_KEYS = Object.values(QUERY_KEYS).map((key) => [key])

const useSeedDemoData = (options = {}) =>
  useMutationWithInvalidation(demoDataApi.seedDemoData, { keysToInvalidate: ALL_QUERY_KEYS, ...options })

const useClearDemoData = (options = {}) =>
  useMutationWithInvalidation(demoDataApi.clearDemoData, { keysToInvalidate: ALL_QUERY_KEYS, ...options })

export { useSeedDemoData, useClearDemoData }
