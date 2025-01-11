import { useMutation } from '@tanstack/react-query'
import { message, Tooltip } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AutoForm } from '../../components/auto-form'
import MyDrawer from '../../components/my-drawer'
import MySegmented from '../../components/my-segmented'
import MyTable from '../../components/my-table'
import { useLocationParams } from '../../hooks/use-location-params'
import { useRouterPush } from '../../hooks/use-router-push'
import i18n from '../../i18n/i18n'
import PageLayout from '../../layouts/page-layout'
import api from '../../models/axios'
import { useUsers } from '../../models/users'

const Employees = () => {
  const { data: users, isLoading: isLoadingUsers, refetch } = useUsers()
  const { t } = useTranslation()
  const { push } = useRouterPush()
  const { query } = useLocationParams()
  const { mutate } = useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (newUser: Record<string, any>) => {
      await api.post('/staff/create', newUser)
    },
  })

  const segmentedValues = useMemo(
    () => [
      {
        value: t('employees.archive'),
        key: 'archive',
      },
      {
        value: t('employees.teachers'),
        key: 'teachers',
        isPrimary: true,
      },
      {
        value: t('employees.other'),
        key: 'other',
      },
    ],
    [t]
  )

  const columns = useMemo(
    () => [
      {
        key: 'firstName',
        title: t('form.fio'),
        dataIndex: 'fio',
        fixed: true,
        ellipsis: {
          showTitle: false,
        },
        render: (item: Record<string, any>) => (
          <Link to={`${item.id}`}>{item.name}</Link>
        ),
      },
      {
        key: 'phone',
        title: t('form.phone'),
        dataIndex: 'phoneNumber',
        ellipsis: {
          showTitle: false,
        },
        render: (text: string) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        key: 'role',
        title: t('form.role'),
        dataIndex: 'role',
        ellipsis: {
          showTitle: false,
        },
        render: (text: string) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
    ],
    [t]
  )

  const data = useMemo<Record<string, any>[]>(() => {
    return users?.map((item: Record<string, any>) => ({
      ...item,
      key: item.id,
      fio: {
        id: item.id,
        name: `${item.firstname || ''} ${item.lastname || ''}`,
      },
    }))
  }, [users])

  const fields = useMemo(
    () => [
      {
        name: 'lastname',
        label: t('form.lastName'),
        type: 'text',
        rules: [
          {
            required: true,
            message: t('formMessages.lastName'),
          },
        ],
      },
      {
        name: 'firstname',
        label: t('form.name'),
        type: 'text',
        rules: [
          {
            required: true,
            message: t('formMessages.firstName'),
          },
        ],
      },
      {
        name: 'phoneNumber',
        label: t('form.phone'),
        type: 'text',
        rules: [
          {
            required: true,
            message: t('formMessages.phone'),
          },
        ],
      },
      {
        name: 'password',
        label: t('form.password'),
        type: 'password',
        rules: [
          {
            required: true,
            message: t('formMessages.password'),
          },
        ],
      },
      {
        name: 'role',
        label: t('form.role'),
        type: 'select',
        options: [
          {
            label: t('employees.teacher'),
            value: 'TEACHER',
          },
          {
            label: t('employees.cleaner'),
            value: 'CLEANER',
          },
        ],
        rules: [
          {
            required: true,
            message: t('formMessages.role'),
          },
        ],
      },
      {
        name: 'dateOfBirth',
        label: t('form.dateOfBirth'),
        type: 'datepicker',
        rules: [
          {
            required: true,
            message: t('formMessages.dateOfBirth'),
          },
        ],
      },
      {
        name: 'gender',
        label: t('form.gender'),
        type: 'radio',
        options: [
          {
            label: t('form.male'),
            value: 'MALE',
          },
          {
            label: t('form.female'),
            value: 'FEMALE',
          },
        ],
        rules: [
          {
            required: true,
            message: t('formMessages.gender'),
          },
        ],
      },
    ],
    [t]
  )

  const onCancel = () => {
    push({
      query: {
        add: undefined,
        edit: undefined,
        view: undefined,
        id: undefined,
      },
    })
  }

  const onFinish = (values: Record<string, any>) => {
    mutate(values)
    refetch()
    message.success(t('formMessages.success'))
  }

  if (isLoadingUsers) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <PageLayout
      title={t('employees.title')}
      segmented={
        <MySegmented
          segmentedValues={segmentedValues}
          queryName="employeeTab"
        />
      }
    >
      <MyTable hasDetailPageWithId={'fio'} columns={columns} data={data} />
      <MyDrawer
        entryPoint="add"
        title={
          i18n.language === 'uz'
            ? `${t('employees.titleSingular')} ${t('crud.add')}`
            : `${t('crud.add')} ${t('employees.titleSingular')}`
        }
      >
        <AutoForm
          onFinish={onFinish}
          onCancel={onCancel}
          saveTitle={query.add ? t('crud.create') : t('form.save')}
          cancelTitle={t('form.cancel')}
          fields={fields}
        />
      </MyDrawer>
    </PageLayout>
  )
}

export default Employees
