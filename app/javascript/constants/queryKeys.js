// Stable keys for React Query caching and invalidation. Keeping them here stops a
// typo in one component from silently creating a second, never-invalidated cache entry.
const QUERY_KEYS = {
  EMPLOYEES: 'employees',
}

export default QUERY_KEYS
