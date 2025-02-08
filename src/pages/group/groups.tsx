import { Form, Tag } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AutoForm, FormField } from '../../components/auto-form.tsx'
import { CustomLoader } from '../../components/loader.tsx'
import MyDrawer from '../../components/my-drawer.tsx'
import MySegmented from '../../components/my-segmented.tsx'
import MyTable from '../../components/my-table.tsx'
import { useLocationParams } from '../../hooks/use-location-params.tsx'
import { useRouterPush } from '../../hooks/use-router-push.tsx'
import PageLayout from '../../layouts/page-layout.tsx'
import {
  GroupType,
  useCreateGroup,
  useDeleteGroup,
  useGroupProfile,
  useGroups,
  useUpdateGroup,
} from '../../models/groups.tsx'
import { useRooms } from '../../models/rooms.tsx'
import { useUsers } from '../../models/users.tsx'

const Groups = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { query } = useLocationParams()
  const { push } = useRouterPush()
  const {
    data: groups,
    isLoading: isGroupsLoading,
    refetch: refetchGroups,
  } = useGroups(
    ((query.groupsTab?.toString().toUpperCase() as GroupType) ||
      'ACTIVE') as GroupType
  )
  const { data: rooms } = useRooms()
  const {
    data: group,
    refetch: refetchGroup,
    isLoading: isGroupLoading,
  } = useGroupProfile(query.id as string)
  const { mutate: createGroup } = useCreateGroup()
  const { mutate: updateGroup } = useUpdateGroup()
  const { mutate: deleteGroup } = useDeleteGroup()
  const { data: teachers, isLoading: isTeacherLoading } = useUsers('TEACHER')

  useEffect(() => {
    const refetch = async () => {
      await refetchGroups()
    }
    refetch()
  }, [query.groupsTab])

  useEffect(() => {
    const fetch = async () => {
      await refetchGroup()
      if (query.edit && query.id && group) {
        form.setFieldsValue({
          ...group,
          roomId: group?.room?.id,
          teacherId: group?.teacher?.id,
          startTime: dayjs(group?.startTime, 'HH:mm'),
          startDate: dayjs(group?.startDate, 'YYYY-MM-DD'),
          endDate: dayjs(group?.endDate, 'YYYY-MM-DD'),
        })
      }
    }

    fetch()
  }, [query.edit, query.id, group, form])

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
        type: 'select',
        rules: [
          {
            required: true,
            message: t('formMessages.firstName'),
          },
        ],
        options: [
          'Front end',
          'Back end',
          'Full stack',
          'Python',
          'Java',
          'C',
          'C#',
          'Foundation',
          '.NET',
          'PHP',
          'SQL',
        ].map((course: string) => ({
          label: course,
          value: course,
        })),
      },
      {
        name: 'teacherId',
        label: t('groups.chooseTeacher'),
        type: 'select',
        options: teachers?.data?.map((teacher: Record<string, any>) => ({
          label: teacher.firstname + ' ' + teacher.lastname,
          value: teacher.id,
        })),
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
            label: t('groups.Juft_kun'),
            value: 'Juft_kun',
          },

          {
            label: t('groups.Toq_kun'),
            value: 'Toq_kun',
          },
          {
            label: t('groups.Dushanba'),
            value: 'Dushanba',
          },
          {
            label: t('groups.Seshanba'),
            value: 'Seshanba',
          },
          {
            label: t('groups.Chorshanba'),
            value: 'Chorshanba',
          },
          {
            label: t('groups.Payshanba'),
            value: 'Payshanba',
          },
          {
            label: t('groups.Juma'),
            value: 'Juma',
          },
          {
            label: t('groups.Shanba'),
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
        options: rooms?.data?.map((room: Record<string, any>) => ({
          label: room?.roomName,
          value: room.id,
        })),
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
        render: ({ groupName, groupId }: Record<string, any>) => (
          <Link to={`${groupId}`}>{groupName}</Link>
        ),
      },
      {
        title: t('groups.courseName'),
        dataIndex: 'courseName',
        key: 'courseName',
        render: (courseName: string) => (
          <span className="capitalize">{courseName}</span>
        ),
      },
      {
        title: t('groups.teacher'),
        dataIndex: 'teacher',
        key: 'teacher',
        render: (teacher: Record<string, any>) =>
          teacher?.firstname && teacher?.lastname
            ? teacher?.firstname + ' ' + teacher?.lastname
            : 'Xatolik',
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
        render: (days: string[]) =>
          days
            ? days.map((day: string) => (
                <Tag color="blue">{t(`groups.${day}`)}</Tag>
              ))
            : days,
      },
      {
        title: t('groups.startTime'),
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: t('groups.startDate'),
        dataIndex: 'startDate',
        key: 'startDate',
        render: (startDate: string) => dayjs(startDate).format('DD-MM-YYYY'),
      },
      {
        title: t('groups.endDate'),
        dataIndex: 'endDate',
        key: 'endDate',
        render: (endDate: string) => dayjs(endDate).format('DD-MM-YYYY'),
      },
      {
        title: t('groups.price'),
        dataIndex: 'groupPrice',
        key: 'groupPrice',
        render: (groupPrice: number) => groupPrice + " so'm",
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
    form.resetFields()
  }

  const onFinish = (values: Record<string, any>) => {
    console.log(values)
    if (query.edit && query.id) {
      updateGroup({
        groupId: query.id as string,
        data: {
          ...values,
          startTime: dayjs(values.startTime).format('HH:mm'),
          startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
          endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
          groupPrice: parseInt(values.groupPrice),
        },
      })
    } else {
      createGroup({
        groupId: query.id as string,
        data: {
          ...values,
          startTime: dayjs(values.startTime).format('HH:mm'),
          startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
          endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
          groupPrice: parseInt(values.groupPrice),
        },
      })
    }
    onCancel()
  }

  if (isGroupsLoading || isTeacherLoading) return <CustomLoader />

  if (isGroupLoading) return <CustomLoader />

  return (
    <PageLayout
      title={t('groups.title')}
      segmented={
        <MySegmented
          segmentedValues={[
            { value: t('groups.active'), key: 'active', isPrimary: true },
            { value: t('groups.archive'), key: 'archive' },
          ]}
          queryName={'groupsTab'}
        />
      }
    >
      <MyTable
        columns={columns}
        data={
          query.search
            ? groups?.data
                .filter(
                  (item: Record<string, any>) =>
                    item.groupName
                      .toString()
                      .toLowerCase()
                      .includes(
                        (query.search as string).toString().toLowerCase()
                      ) ||
                    item.courseName
                      .toString()
                      .toLowerCase()
                      .includes(
                        (query.search as string).toString().toLowerCase()
                      )
                )
                .map((item: Record<string, any>) => {
                  return {
                    ...item,
                    groupName: { groupName: item.groupName, groupId: item.id },
                  }
                })
            : groups?.data.map((item: Record<string, any>) => {
                return {
                  ...item,
                  groupName: { groupName: item.groupName, groupId: item.id },
                }
              })
        }
        name="group"
        deleteFunc={deleteGroup}
      />
      <MyDrawer form={form} entryPoint="add" title={t('groups.titleSingular')}>
        <AutoForm
          form={form}
          fields={fields as FormField[]}
          onFinish={onFinish}
          saveTitle={t('crud.create')}
          cancelTitle={t('form.cancel')}
        />
      </MyDrawer>
    </PageLayout>
  )
}

export default Groups
