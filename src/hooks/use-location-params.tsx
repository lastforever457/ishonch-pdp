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
  const query = useMemo(
    () => queryString.parse(search, parseUrlOptions),
    [search]
  )

  return { query, pathname, domain: window.location.origin }
}
