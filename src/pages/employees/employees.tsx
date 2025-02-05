import { Form, message, Tooltip } from 'antd'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AutoForm } from '../../components/auto-form'
import { CustomLoader } from '../../components/loader.tsx'
import MyDrawer from '../../components/my-drawer'
import MySegmented from '../../components/my-segmented'
import MyTable from '../../components/my-table'
import { useLocationParams } from '../../hooks/use-location-params'
import { useRouterPush } from '../../hooks/use-router-push'
import PageLayout from '../../layouts/page-layout'
import {
  StaffTypes,
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUser,
  useUsers,
} from '../../models/users'
import { formatPhoneNumber } from '../../utils.ts'

const Employees = () => {
  const { t } = useTranslation()
  const { push } = useRouterPush()
  const { query } = useLocationParams()
  const [form] = Form.useForm()
  const { mutate: mutateCreateUser } = useCreateUser()
  const { mutate: mutateUpdateUser } = useUpdateUser()
  const { mutate: mutateDeleteUser } = useDeleteUser()
  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = useUsers(
    (query.employeeTab?.toString().toUpperCase() as StaffTypes) || 'TEACHER'
  )
  const { data: user, refetch: refetchUser } = useUser(query.id as string)

  useEffect(() => {
    refetchUsers()
  }, [query.employeeTab])

  useEffect(() => {
    if (query.edit && query.id) {
      const fetch = async () => {
        await refetchUser()
      }
      fetch()
    }
  }, [query.id, query.edit])

  useEffect(() => {
    if (Array.isArray(user)) {
      console.log(user[0])
      form.setFieldsValue(
        user ? { ...user[0], phoneNumber: user[0].phoneNumber.slice(4) } : {}
      )
    }
  }, [user])

  const segmentedValues = useMemo(
    () => [
      {
        value: t('employees.archive'),
        key: 'archive',
      },
      {
        value: t('employees.teachers'),
        key: 'teacher',
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
        render: (text: string) => formatPhoneNumber(text),
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

  const data = useMemo(() => {
    const remainedData: Record<string, any> | undefined = query.search
      ? users?.data?.filter(
          (item: Record<string, any>) =>
            `${item.firstname} ${item.lastname}`
              .toLowerCase()
              .includes((query.search as string).toString().toLowerCase()) ||
            item.phoneNumber
              .toLowerCase()
              .includes((query.search as string).toString().toLowerCase())
        )
      : users?.data
    return (
      remainedData?.map((item: Record<string, any>) => ({
        ...item,
        key: item.id,
        fio: {
          id: item.id,
          name: `${item.firstname || ''} ${item.lastname || ''}`,
        },
      })) || []
    )
  }, [users, query.search])

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
        addonBefore: '+998',
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

  const onFinish = async (values: Record<string, any>) => {
    if (query.edit && query.id) {
      await mutateUpdateUser({
        data: {
          ...values,
          phoneNumber: `+998${values.phoneNumber}`,
        },
        id: query.id,
      })
    } else {
      await mutateCreateUser({
        ...values,
        phoneNumber: `+998${values.phoneNumber}`,
      })
    }
    message.success(t('formMessages.success'))
    form.resetFields()
  }

  if (isLoadingUsers) return <CustomLoader />

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
      <MyTable
        name="employees"
        hasDetailPageWithId={'fio'}
        columns={columns}
        data={data}
        deleteFunc={mutateDeleteUser}
        isLoading={isLoadingUsers}
      />
      <MyDrawer
        form={form}
        entryPoint="add"
        title={t('employees.titleSingular')}
      >
        <AutoForm
          form={form}
          onFinish={onFinish}
          saveTitle={query.add ? t('crud.create') : t('form.save')}
          cancelTitle={t('form.cancel')}
          fields={fields}
        />
      </MyDrawer>
    </PageLayout>
  )
}

export default Employees
