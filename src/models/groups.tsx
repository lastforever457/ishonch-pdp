import { useQuery } from '@tanstack/react-query'
import api from './axios'

export type GroupType = 'ACTIVE' | 'ARCHIVE'

export const useGroups = (status: GroupType) => {
  const data = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data } = await api.get(`/group/${status}`)
      return data
    },
  })
  return data
}
  