import type { ParseOptions } from 'query-string'
import queryString from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const parseUrlOptions: ParseOptions = {
  parseNumbers: true,
  parseBooleans: true,
  arrayFormat: 'bracket',
  arrayFormatSeparator: '|',
}

export const useLocationParams = () => {
  const { pathname, search } = useLocation()
  const query = useMemo(() => {
    const parsedQuery = queryString.parse(search, parseUrlOptions)
    Object.keys(parsedQuery).forEach((key) => {
      if (typeof parsedQuery[key] === 'string') {
        parsedQuery[key] = parsedQuery[key].replace(/%20/g, ' ')
      }
    })
    console.log(parsedQuery)
    return parsedQuery
  }, [search])

  return { query, pathname, domain: window.location.origin }
}
