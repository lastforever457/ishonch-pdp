import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from './axios'

const useFinance = () => {
  const data = useQuery({
    queryKey: ['finance'],
    queryFn: async () => {
      const response = await api.get('/finance')
      return response.data
    },
    select: (data) => data?.data,
  })

  return data
}

export const useCreateFinance = () => {
  const queryClient = useQueryClient()
  const data = useMutation({
    mutationKey: ['createFinance'],
    mutationFn: async (finance: Record<string, any>) => {
      await api.post('/finance/add', finance)
      await queryClient.invalidateQueries({ queryKey: ['finance'] })
    },
  })

  return data
}

export const useDeleteFinance = () => {
  const queryClient = useQueryClient()
  const data = useMutation({
    mutationKey: ['deleteFinance'],
    mutationFn: async (id) => {
      await api.delete(`/finance/${id}`)
      await queryClient.invalidateQueries({ queryKey: ['finance'] })
    },
  })
  return data
}

export default useFinance
