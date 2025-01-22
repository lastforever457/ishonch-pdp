import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AutoForm, FormField } from '../../components/auto-form.tsx'
import { Loader } from '../../components/loader.tsx'
import MyDrawer from '../../components/my-drawer.tsx'
import MySegmented from '../../components/my-segmented.tsx'
import MyTable from '../../components/my-table.tsx'
import { useLocationParams } from '../../hooks/use-location-params.tsx'
import PageLayout from '../../layouts/page-layout.tsx'
import { useCreateGroup, useGroups } from '../../models/groups.tsx'
import { useRooms } from '../../models/rooms.tsx'
import { useUsers } from '../../models/users.tsx'

const Groups = () => {
  const { t } = useTranslation()
  const { query } = useLocationParams()
  const { data: groups, isLoading: isGroupsLoading } = useGroups('ACTIVE')
  const { data: rooms, isLoading: isRoomsLoading } = useRooms()
  const { mutate } = useCreateGroup()

  const { data: teachers, isLoading: isTeacherLoading } = useUsers('TEACHER')

  console.log(groups)

  const fields = useMemo(
    () => [
      {
        name: 'groupName',
        label: t('groups.name'),
        type: 'input',
        rules: [
          {
            required: true,
            message: t('formMessages.firstName'),
          },
        ],
      },
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
        name: 'teacherId',
        label: t('groups.chooseTeacher'),
        type: 'select',
        options: teachers?.data?.map(
          (teacher: Record<string, any>, index: number) => ({
            key: index,
            label: teacher.firstname + ' ' + teacher.lastname,
            value: teacher.id,
          })
        ),
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
        mode: 'multiple',
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
        name: 'roomId',
        label: t('groups.chooseRoom'),
        type: 'select',
        options: rooms?.data?.map(
          (room: Record<string, any>, index: number) => ({
            key: index,
            label: room?.name,
            value: room.id,
          })
        ),
        rules: [
          {
            required: true,
            message: t('formMessages.role'),
          },
        ],
      },
      {
        name: 'startTime',
        label: t('groups.startTime'),
        type: 'timepicker',
        rules: [
          {
            required: true,
            message: t('formMessages.timeStart'),
          },
        ],
      },
      {
        name: 'startDate',
        label: t('groups.startDate'),
        type: 'datepicker',
        rules: [
          {
            required: true,
            message: t('formMessages.startDate'),
          },
        ],
      },
      {
        name: 'endDate',
        label: t('groups.endDate'),
        type: 'datepicker',
        rules: [
          {
            required: true,
            message: t('formMessages.endDate'),
          },
        ],
      },
      {
        name: 'groupPrice',
        label: t('groups.price'),
        type: 'input',
        rules: [
          {
            required: true,
            message: t('formMessages.endDate'),
          },
        ],
      },
    ],
    [t, teachers, rooms]
  )

  const columns = useMemo(
    () => [
      {
        title: t('groups.name'),
        dataIndex: 'groupName',
        key: 'groupName',
      },
      {
        title: t('groups.courseName'),
        dataIndex: 'courseName',
        key: 'courseName',
      },
      {
        title: t('groups.teacher'),
        dataIndex: 'teacher',
        key: 'teacher',
        render: (teacher: Record<string, any>) =>
          teacher?.firstname + ' ' + teacher?.lastname,
      },
      {
        title: t('groups.room'),
        dataIndex: 'room',
        key: 'room',
        render: (room: Record<string, any>) => room?.roomName,
      },
      {
        title: t('groups.days'),
        dataIndex: 'days',
        key: 'days',
        // render: (days: string[]) => days.join(', '),
      },
      {
        title: t('groups.startTime'),
        dataIndex: 'startTime',
        key: 'startTime',
        render: (startTime: string) =>
          new Date(startTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
      },
      {
        title: t('groups.startDate'),
        dataIndex: 'startDate',
        key: 'startDate',
        render: (startDate: string) => new Date(startDate).toLocaleDateString(),
      },
      {
        title: t('groups.endDate'),
        dataIndex: 'endDate',
        key: 'endDate',
        render: (endDate: string) => new Date(endDate).toLocaleDateString(),
      },
      {
        title: t("groups.price"),
        dataIndex: "groupPrice",
        key: "groupPrice",
        render: (groupPrice: number) => groupPrice + " so'm",
      },
    ],
    [t]
  )

  const onFinish = (values: Record<string, any>) => {
    console.log(values)
    mutate({
      ...values,
      groupPrice: Number(values.groupPrice),
    })
  }

  if (isGroupsLoading || isTeacherLoading || isRoomsLoading) {
    return <Loader />
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
      <MyTable columns={columns} data={groups?.data || []} name="groups" />
      <MyDrawer entryPoint="add" title={t('groups.titleSingular')}>
        <AutoForm
          fields={fields as FormField[]}
          onCancel={() => {}}
          onFinish={onFinish}
          saveTitle={t('crud.create')}
          cancelTitle={t('form.cancel')}
        />
      </MyDrawer>
    </PageLayout>
  )
}

export default Groups
