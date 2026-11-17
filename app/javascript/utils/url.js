import { parse, stringify } from 'qs'
import { fromPairs, isEmpty, isNil, map, omit, pickBy, pipe, toPairs } from 'ramda'

import { camelToSnakeCase, snakeToCamelCase } from 'utils/string'

const mapKeys = (transform) => pipe(toPairs, map(([key, value]) => [transform(key), value]), fromPairs)

export const preprocessForSerialization = pipe(
  pickBy((value) => !isNil(value) && value !== ''),
  mapKeys(camelToSnakeCase)
)

export const getQueryParams = (options = {}) =>
  mapKeys(snakeToCamelCase)(parse(location.search, { ignoreQueryPrefix: true, ...options }))

export const buildUrl = (route, params) => {
  const placeHolders = []
  toPairs(params).forEach(([key, value]) => {
    if (!route.includes(`:${key}`)) return
    placeHolders.push(key)
    route = route.replace(`:${key}`, encodeURIComponent(value))
  })

  const queryParams = pipe(omit(placeHolders), preprocessForSerialization, stringify)(params)

  return isEmpty(queryParams) ? route : `${route}?${queryParams}`
}
