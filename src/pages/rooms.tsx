import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AutoForm } from '../components/auto-form'
import MyDrawer from '../components/my-drawer'
import MyTable from '../components/my-table'
import { useLocationParams } from '../hooks/use-location-params'
import { useRouterPush } from '../hooks/use-router-push'
import i18n from '../i18n/i18n'
import PageLayout from '../layouts/page-layout'
import { useCreateRoom, useRooms } from '../models/rooms'

const Rooms = () => {
  const { t } = useTranslation()
  const { query } = useLocationParams()
  const { push } = useRouterPush()
  const { data: rooms } = useRooms()
  const { mutate } = useCreateRoom()

  const fields = useMemo(
    () => [
      {
        name: 'roomName',
        label: t('rooms.roomName'),
        type: 'text',
        rules: [
          {
            required: true,
            message: t('formMessages.name'),
          },
        ],
      },
      {
        name: 'capacity',
        label: t('rooms.roomCapacity'),
        type: 'text',
        rules: [
          {
            required: true,
            message: t('formMessages.capacity'),
          },
        ],
      },
      {
        name: 'countOfTable',
        label: t('rooms.countOfTable'),
        type: 'text',
        rules: [
          {
            required: true,
            message: t('formMessages.count'),
          },
        ],
      },
      {
        name: 'countOfChair',
        label: t('rooms.countOfChair'),
        type: 'text',
        rules: [
          {
            required: true,
            message: t('formMessages.count'),
          },
        ],
      },
    ],
    [t]
  )

  const columns = useMemo(
    () => [
      {
        title: t('rooms.roomName'),
        dataIndex: 'roomName',
        key: 'roomName',
        ellipsis: {
          showTitle: false,
        },
        fixed: true,
      },
      {
        title: t('rooms.roomCapacity'),
        dataIndex: 'capacity',
        key: 'capacity',
        ellipsis: {
          showTitle: false,
        },
      },
      {
        title: t('rooms.countOfTable'),
        dataIndex: 'countOfTable',
        key: 'countOfTable',
        ellipsis: {
          showTitle: false,
        },
      },
      {
        title: t('rooms.countOfChair'),
        dataIndex: 'countOfChair',
        key: 'countOfChair',
        ellipsis: {
          showTitle: false,
        },
      },
    ],
    []
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
    try {
      mutate(values)
      onCancel()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <PageLayout title={t('rooms.title')}>
      <MyTable name="room" columns={columns} data={rooms?.data} />
      <MyDrawer
        entryPoint="add"
        title={
          i18n.language === 'uz'
            ? `${t('rooms.titleSingular')} ${t('crud.add')}`
            : `${t('crud.add')} ${t('rooms.titleSingular')}`
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

export default Rooms
