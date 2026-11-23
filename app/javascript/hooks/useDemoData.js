import { useMutation } from '@tanstack/react-query'

import demoDataApi from 'apis/demoData'

// Seeding/clearing runs in a background job - a successful response here only means the job was
// enqueued, not that it finished. Callers should track completion via
// useProgress('DemoDataChannel', 'task_id', taskId) and invalidate queries then, not on this mutation's success.
const useSeedDemoData = (options = {}) => useMutation({ mutationFn: demoDataApi.seedDemoData, ...options })

const useClearDemoData = (options = {}) => useMutation({ mutationFn: demoDataApi.clearDemoData, ...options })

export { useSeedDemoData, useClearDemoData }
