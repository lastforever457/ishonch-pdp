import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AutoForm } from '../components/auto-form.tsx'
import MyDrawer from '../components/my-drawer.tsx'
import MySegmented from '../components/my-segmented.tsx'
import MyTable from '../components/my-table.tsx'
import { useLocationParams } from '../hooks/use-location-params.tsx'
import PageLayout from '../layouts/page-layout.tsx'
import { useGroups } from '../models/groups.tsx'
import { useStudents } from '../models/students.tsx'

const Students = () => {
  const { t } = useTranslation()
  const { query } = useLocationParams()
  const { data: students, isLoading: isStudentsLoading } = useStudents()
  const { data: groups, isLoading: isGroupsLoading } = useGroups('ACTIVE')

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
        type: 'input',
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
        rules: [
          {
            required: true,
            message: t('formMessages.role'),
          },
        ],
        options: groups?.data?.map((group: any) => ({
          value: group.id,
          label: `${group.groupName} - ${group.courseName}`,
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
        title: t('students.name'),
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
      },
    ],
    [t]
  )

  if (isStudentsLoading || isGroupsLoading) {
    return <div className="text-center">Loading...</div>
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
        data={students?.data.map((item: Record<string, any>) => ({
          ...item,
          fio: `${item.firstname} ${item.lastname}`,
          key: item.id,
        }))}
      />
      <MyDrawer
        entryPoint={query.add ? 'add' : 'edit'}
        title={t('students.titleSingular')}
      >
        <AutoForm fields={fields} onCancel={() => {}} onFinish={() => {}} />
      </MyDrawer>
    </PageLayout>
  )
}

export default Students
