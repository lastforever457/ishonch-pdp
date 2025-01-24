import { Form } from 'antd'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AutoForm, FormField } from '../components/auto-form.tsx'
import { Loader } from '../components/loader.tsx'
import MyDrawer from '../components/my-drawer.tsx'
import MySegmented from '../components/my-segmented.tsx'
import MyTable from '../components/my-table.tsx'
import { useLocationParams } from '../hooks/use-location-params.tsx'
import PageLayout from '../layouts/page-layout.tsx'
import { useGroups } from '../models/groups.tsx'
import { useStudents } from '../models/students.tsx'

const Students = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { query } = useLocationParams()
  const { data: students, isLoading: isStudentsLoading } = useStudents()
  const { data: groups, isLoading: isGroupsLoading } = useGroups('ACTIVE')
  console.log(groups)

  useEffect(() => {
    if (query.edit && query.id) {
      form.setFieldsValue(
        students?.data?.find((room: any) => room.id === query.id)
      )
    }
  }, [query.edit, query.id, students])

  const data = useMemo(() => {
    const remainedData: Record<string, any> | undefined = query.search
      ? students?.data?.filter(
          (item: Record<string, any>) =>
            item?.student?.firstname.includes(query.search as string) ||
            item?.student?.lastname.includes(query.search as string)
        )
      : students?.data
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
  }, [students, query.search])

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
        name: 'phone',
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
        options: groups?.data?.map((group: any) => {
          return {
            value: group.id,
            label: `${group?.groupName?.toString().toUpperCase()} - ${group.courseName.toString().toUpperCase()}`,
          }
        }),
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
        render: (value: any) => value.toUpperCase(),
      },
    ],
    [t]
  )

  if (isStudentsLoading || isGroupsLoading) {
    return <Loader />
  }

  return (
    <PageLayout
      title={t('students.title')}
      segmented={
        <MySegmented
          segmentedValues={[
            { value: t('students.students'), key: 'students' },
            { value: t('students.archive'), key: 'archive', isPrimary: true },
          ]}
          queryName={'studentsTab'}
        />
      }
    >
      <MyTable
        name="student"
        columns={columns}
        data={data.map((item: Record<string, any>) => ({
          ...item.student,
          group: item.groupName ? item.groupName : t('form.not connected'),
          fio: `${item?.student?.firstname} ${item?.student?.lastname}`,
          key: item.id,
        }))}
      />
      <MyDrawer
        entryPoint={query.add ? 'add' : 'edit'}
        title={t('students.titleSingular')}
      >
        <AutoForm
          fields={fields as FormField[]}
          onCancel={() => {}}
          onFinish={() => {}}
        />
      </MyDrawer>
    </PageLayout>
  )
}

export default Students
