import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AutoForm } from '../../components/auto-form.tsx'
import MyDrawer from '../../components/my-drawer.tsx'
import MySegmented from '../../components/my-segmented.tsx'
import MyTable from '../../components/my-table.tsx'
import { useLocationParams } from '../../hooks/use-location-params.tsx'
import PageLayout from '../../layouts/page-layout.tsx'
import api from '../../models/axios.ts'
import Archive from './archive.tsx'
import Attendance from './attendance.tsx'

const Groups = () => {
  const { t } = useTranslation()
  const { query } = useLocationParams()
  const { mutate } = useMutation({
    mutationKey: ['create-group'],
    mutationFn: async (newGroup: Record<string, any>) => {
      await api.post('/group/create', newGroup)
    },
  })
 
  const getTeachers = async () => {
    const { data } = await api.get('/teachers')
    console.log(data)
  }

  const fields = useMemo(
    () => [
      {
        name: 'courseName',
        label: t('groups.courseName'),
        type: 'input',
        rules: [
          {
            required: true,
            message: t('formMessages.firstName'),
          },
        ],
      },
      {
        name: 'teacher',
        label: t('groups.chooseTeacher'),
        type: 'select',
        rules: [
          {
            required: true,
            message: t('formMessages.phone'),
          },
        ],
      },
      {
        name: 'days',
        label: t('groups.days'),
        type: 'select',
        options: [
          {
            label: t('groups.monday'),
            value: 'Dushanba',
          },
          {
            label: t('groups.tuesday'),
            value: 'Seshanba',
          },
          {
            label: t('groups.wednesday'),
            value: 'Chorshanba',
          },
          {
            label: t('groups.thursday'),
            value: 'Payshanba',
          },
          {
            label: t('groups.friday'),
            value: 'Juma',
          },
          {
            label: t('groups.saturday'),
            value: 'Shanba',
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
        name: 'rooms',
        label: t('groups.chooseRoom'),
        type: 'select',
        rules: [
          {
            required: true,
            message: t('formMessages.role'),
          },
        ],
      },
      {
        name: 'time',
        label: t('groups.startTime'),
        type: 'timepicker',
        rules: [
          {
            required: true,
            message: t('formMessages.timeStart'),
          },
        ],
      },
    ],
    [t]
  )

  const columns = useMemo(
    () => [
      {
        key: 'group',
        title: t('groups.title'),
        dataIndex: 'Guruhlar',
      },
      {
        key: 'teacher',
        title: t('groups.chooseTeacher'),
        dataIndex: 'Teacher',
      },

      {
        key: 'st number',
        title: t('groups.stNumber'),
        dataIndex: 'St number',
      },
      {},
      {
        key: 'days',
        title: t('groups.days'),
        dataIndex: 'Kunlar',
      },
      {
        key: 'time',
        title: t('groups.startTime'),
        dataIndex: 'Vaqt',
      },
    ],
    [t]
  )

  // const groups = useMemo(() => []);

  const onFinish = () => {
    mutate({})
  }

  return (
    <PageLayout
      title={t('groups.title')}
      segmented={
        <MySegmented
          segmentedValues={[
            { value: t('groups.active'), key: 'active' },
            { value: t('groups.archive'), key: 'archive', isPrimary: true },
            { value: t('groups.attendance'), key: 'attendance' },
          ]}
          queryName={'groupsTab'}
        />
      }
    >
      {query.groupsTab === 'active' ? (
        <MyTable name="group" columns={columns} data={[]} />
      ) : query.groupsTab === 'attendance' ? (
        <Attendance />
      ) : query.groupsTab === 'archive' ? (
        <Archive />
      ) : null}
      <MyDrawer entryPoint="add" title={t('groups.titleSingular')}>
        <AutoForm
          fields={fields}
          onCancel={() => {}}
          onFinish={() => {
            onFinish()
          }}
          saveTitle={t('crud.create')}
          cancelTitle={t('form.cancel')}
        />
      </MyDrawer>
    </PageLayout>
  )
}

export default Groups
