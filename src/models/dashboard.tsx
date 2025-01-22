import { useQuery } from '@tanstack/react-query'
import api from './axios'

export const useDashboard = () => {
  const data = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await api.get('/dashboard')
      return res.data
    },
    select: (data) => data.data,
  })
  return data
}
