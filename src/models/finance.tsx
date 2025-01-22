import { useMutation, useQuery } from '@tanstack/react-query'
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
  const data = useMutation({
    mutationKey: ['createFinance'],
    mutationFn: async (finance) => {
      const response = await api.post('/finance/add', finance)
      return response.data
    },
  })

  return data
}

export default useFinance
