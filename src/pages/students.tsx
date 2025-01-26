import { Form } from 'antd'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AutoForm, FormField } from '../components/auto-form.tsx'
import { Loader } from '../components/loader.tsx'
import MyDrawer from '../components/my-drawer.tsx'
import MySegmented from '../components/my-segmented.tsx'
import MyTable from '../components/my-table.tsx'
import { useLocationParams } from '../hooks/use-location-params.tsx'
import { useRouterPush } from '../hooks/use-router-push.tsx'
import PageLayout from '../layouts/page-layout.tsx'
import { useGroups } from '../models/groups.tsx'
import {
  useArchiveStudent,
  useCreateStudent,
  useDeleteStudent,
  useStudent,
  useStudents,
  useUpdateStudent,
} from '../models/students.tsx'

const Students = () => {
  const { push } = useRouterPush()
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { query } = useLocationParams()
  const { data: students, isLoading: isStudentsLoading } = useStudents()
  const { data: archiveStudents, isLoading: isArchiveStudentsLoading } =
    useArchiveStudent()
  const { mutate: mutateCreateStudent } = useCreateStudent()
  const { mutate: mutateUpdateStudent } = useUpdateStudent()
  const { mutate: mutateDeleteStudent } = useDeleteStudent()
  const { data: student, isLoading: isStudentLoading } = useStudent(
    query.id as string
  )
  const { data: groups, isLoading: isGroupsLoading } = useGroups('ACTIVE')

  useEffect(() => {
    if (query.edit && query.id) {
      form.setFieldsValue(student)
    }
  }, [query.edit, query.id, students, form])

  const fields = useMemo(
    () => [
      {
        name: 'firstname',
        label: t('form.name'),
        type: 'input',
        rules: [
          {
            required: true,
            message: t('formMessages.name'),
          },
        ],
      },
      {
        name: 'lastname',
        label: t('form.lastName'),
        type: 'input',
        rules: [
          {
            required: true,
            message: t('formMessages.name'),
          },
        ],
      },
      {
        name: 'phoneNumber',
        label: t('students.phone'),
        type: 'input',
        addonBefore: '+998',
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
            message: t('formMessages.name'),
          },
        ],
      },
      {
        name: 'group',
        label: t('students.group'),
        type: 'select',
        mode: 'multiple',
        options:
          groups?.data &&
          groups?.data?.map((group: any) => ({
            key: group?.id,
            value: group?.id,
            label: `${group?.groupName?.toUpperCase() || ''} - ${group?.courseName?.toUpperCase() || ''}`,
          })),
      },
      {
        name: 'gender',
        label: t('form.gender'),
        type: 'radio',
        rules: [
          {
            required: true,
            message: t('formMessages.gender'),
          },
        ],
        options: [
          {
            value: 'MALE',
            label: t('form.male'),
          },
          {
            value: 'FEMALE',
            label: t('form.female'),
          },
        ],
      },
    ],
    [t, groups]
  )

  const columns = useMemo(
    () => [
      {
        key: 'fio',
        title: t('form.fio'),
        dataIndex: 'fio',
        render: (value: { id: string | number; name: string }) => (
          <Link to={`/students/${value.id}`}>{value.name}</Link>
        ),
      },
      {
        key: 'phoneNumber',
        title: t('students.phone'),
        dataIndex: 'phoneNumber',
      },
      {
        key: 'group',
        title: t('students.group'),
        dataIndex: 'group',
        render: (value: any) => (value ? value.toUpperCase() : value),
      },
      {
        key: 'gender',
        title: t('form.gender'),
        dataIndex: 'gender',
        render: (value: any) => (value ? t(`form.${value}`) : value),
      },
    ],
    [t]
  )

  const onFinish = (values: Record<string, any>) => {
    if (query.edit && query.id) {
      mutateUpdateStudent({ id: query.id as string, data: values })
    } else {
      mutateCreateStudent({
        ...values,
        group: values.group[0],
      })
    }
    onCancel()
  }

  const onCancel = () => {
    push({
      query: {
        add: undefined,
        edit: undefined,
        view: undefined,
        id: undefined,
      },
    })
    form.resetFields()
  }

  if (isStudentsLoading || isGroupsLoading || isArchiveStudentsLoading) {
    return <Loader />
  }

  return (
    <PageLayout
      title={t('students.title')}
      segmented={
        <MySegmented
          segmentedValues={[
            { value: t('students.students'), key: 'students', isPrimary: true },
            { value: t('students.archive'), key: 'archive' },
          ]}
          queryName={'studentsTab'}
        />
      }
    >
      <MyTable
        name="students"
        columns={columns}
        deleteFunc={mutateDeleteStudent}
        data={
          students && archiveStudents && query.studentsTab === 'archive'
            ? archiveStudents.map((item: any) => ({
                ...item,
                key: item?.id,
                fio: {
                  id: item?.id,
                  name: `${item?.firstname || ''} ${item?.lastname || ''}`.trim(),
                },
              }))
            : students.map((item: any) => ({
                ...item?.student,
                key: item?.student?.id,
                group:
                  item?.groupName && item?.courseName
                    ? `${item?.groupName || ''} - ${item?.courseName || ''}`
                    : t('form.not connected'),
                gender: item?.student?.gender.toLowerCase(),
                fio: {
                  id: item?.student?.id,
                  name: `${item?.student?.firstname || ''} ${item?.student?.lastname || ''}`.trim(),
                },
              }))
        }
      />
      <MyDrawer
        form={form}
        entryPoint={query.add ? 'add' : 'edit'}
        title={t('students.titleSingular')}
      >
        <AutoForm
          form={form}
          fields={fields as FormField[]}
          onFinish={onFinish}
        />
      </MyDrawer>
    </PageLayout>
  )
}

export default Students
