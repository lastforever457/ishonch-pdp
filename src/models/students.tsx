import { useMutation, useQuery } from '@tanstack/react-query'
import api from './axios'

export const useStudents = () => {
  const data = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const res = await api('/student')
      return res.data
    },
  })
  return data
}

export const useCreateStudent = () => {
  const data = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/student/add', data)
      return res.data
    },
  })
  return data
}

export const useUpdateStudent = () => {
  const data = useMutation({
    mutationFn: async (data: {
      id: string | number
      data: Record<string, any>
    }) => {
      const res = await api.patch(`/student/update/${data.id}`, data.data)
      return res.data
    },
  })
  return data
}
