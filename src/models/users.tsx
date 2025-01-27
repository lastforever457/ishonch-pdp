import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { t } from 'i18next'
import api from './axios'

export type StaffTypes = 'TEACHER' | 'OTHER' | 'CLEANER'

export interface DataType {
  message: string
  data: Record<string, any>
  status: boolean
}

export const useUsers = (status: StaffTypes) => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get(`/staff/${status}`)
      return res.data
    },
  })

  return users
}

export const useUser = (id: number | string) => {
  const user = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await api.get(`/staff/profile/${id}`)
      return res.data
    },
    retry: false,
    select: (data) => data?.data,
  })
  return user
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const createUser = useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (newUser: Record<string, any>) => {
      await api.post('/staff/create', newUser)
      message.success(t('formMessages.success'))
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  return createUser
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const updateUser = useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (user: Record<string, any>) => {
      await api.patch(`/staff/${user.id}`, user.data)
      message.success(t('formMessages.success'))
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  return updateUser
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const deleteUser = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (id: number | string) => {
      await api.delete(`/staff/${id}`)
      message.success(t('formMessages.success'))
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  return deleteUser
}
