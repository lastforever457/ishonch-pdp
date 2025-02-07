import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { t } from 'i18next'
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
      message.success(t('formMessages.success'))
      await queryClient.invalidateQueries({ queryKey: ['finance'] })
    },
  })

  return data
}

export const useUpdateFinance = () => {
  const queryClient = useQueryClient()
  const data = useMutation({
    mutationKey: ['updateFinance'],
    mutationFn: async (finance: Record<string, any>) => {
      await api.put(`/finance/${finance.id}`, finance)
      message.success(t('formMessages.success'))
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
      message.success(t('formMessages.success'))
      await queryClient.invalidateQueries({ queryKey: ['finance'] })
    },
  })
  return data
}

export const useFilterFinance = ({
  startDate,
  endDate,
}: {
  startDate: string
  endDate: string
}) => {
  const data = useQuery({
    queryKey: ['filterFinance'],
    queryFn: async () => {
      const response = await api.post('/finance/filter', { startDate, endDate })
      return response.data
    },
    select: (data) => data?.data,
  })
}

export const useCourseFees = () => {
  const data = useQuery({
    queryKey: ['courseFees'],
    queryFn: async () => {
      const response = await api.get('/finance/courseFees')
      return response.data
    },
    select: (data) => data?.data,
  })
  return data
}

export default useFinance
