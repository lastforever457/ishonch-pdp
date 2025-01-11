import { useQuery } from '@tanstack/react-query'
import api from './axios'

export const useUsers = () => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get('/users')
      return res.data
    },
  })

  return users
}
