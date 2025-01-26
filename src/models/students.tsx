import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import api from './axios'

export const useStudents = () => {
  const data = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await api.get('/student')
      return res.data
    },
    select: (data) => data.data,
  })
  return data
}

export const useArchiveStudent = () => {
  const data = useQuery({
    queryKey: ['archiveStudent'],
    queryFn: async () => {
      const res = await api.get(`/student/arxiv`)
      return res.data
    },
    select: (data) => data.data,
  })
  return data
}

export const useStudent = (id: string) => {
  const data = useQuery({
    queryKey: ['student'],
    queryFn: async () => {
      if (!id) return null
      const res = await api(`/student/${id}`)
      return res.data
    },
    retry: false,
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

export const useDeleteStudent = () => {
  const queryClient = useQueryClient()
  const data = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/student/delete/${id}`)
      await queryClient.invalidateQueries({
        queryKey: ['students'],
      })
      message.success('formMessages.success')
      return res.data
    },
  })
  return data
}

export const useStudentsWithoutGroup = () => {
  const data = useQuery({
    queryKey: ['studentsWithoutGroup'],
    queryFn: async () => {
      const res = await api.get('/group/getStudentWithoutGroup')
      return res.data
    },
  })
  return data
}

export const useConnectStudentToGroup = () => {
  const queryClient = useQueryClient()
  const data = useMutation({
    mutationFn: async (data: {
      studentId: string | number
      groupId: string
    }) => {
      const res = await api.post(
        `/group/addNewReader/${data.studentId}/${data.groupId}`
      )
      await queryClient.invalidateQueries({
        queryKey: ['group-profile'],
      })
      return res.data
    },
  })
  return data
}
