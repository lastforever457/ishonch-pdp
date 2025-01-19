import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AutoForm } from '../components/auto-form.tsx'
import MyDrawer from '../components/my-drawer.tsx'
import MySegmented from '../components/my-segmented.tsx'
import MyTable from '../components/my-table.tsx'
import PageLayout from '../layouts/page-layout.tsx'

const Students = () => {
  const { t } = useTranslation()

  const fields = useMemo(
    () => [
      {
        name: 'name',
        label: t('students.name'),
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
        name: 'group',
        label: t('students.group'),
        type: 'select',
        rules: [
          {
            required: true,
            message: t('formMessages.role'),
          },
        ],
      },
      {
        name: 'role',
        label: t('students.role'),
        type: 'select',
        rules: [
          {
            required: true,
            message: t('formMessages.role'),
          },
        ],
      },
    ],
    [t]
  )

  const columns = useMemo(
    () => [
      {
        key: 'name',
        title: t('students.name'),
        dataIndex: 'name',
      },
      {
        key: 'phone',
        title: t('students.phone'),
        dataIndex: 'phone',
      },
      {
        key: 'group',
        title: t('students.group'),
        dataIndex: 'group',
      },
      {
        key: 'role',
        title: t('students.role'),
        dataIndex: 'role',
      },
    ],
    [t]
  )

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
      <MyTable name="student" columns={columns} data={[]} />
      <MyDrawer entryPoint="add" title={t('students.titleSingular')}>
        <AutoForm fields={fields} onCancel={() => {}} onFinish={() => {}} />
      </MyDrawer>
    </PageLayout>
  )
}

export default Students
