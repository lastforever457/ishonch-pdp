import { useQuery } from '@tanstack/react-query'
import api from './axios'

export const useUserMe = () => {
  const me = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get('/me')
      return res.data
    },
  })
  return me
}
