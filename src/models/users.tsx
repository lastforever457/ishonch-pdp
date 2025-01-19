import { useQuery } from '@tanstack/react-query'
import api from './axios'

type StaffTypes = 'TEACHER' | 'OTHER' | 'CLEANER'

export const useUsers = (status: StaffTypes) => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get(`/staff/${status}`)
      return res.data
    },
    select: (data) => data.data,
  })

  return users
}
