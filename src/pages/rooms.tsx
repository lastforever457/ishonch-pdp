import { Form } from 'antd';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AutoForm } from '../components/auto-form';
import { CustomLoader } from '../components/loader';
import MyDrawer from '../components/my-drawer';
import MyTable from '../components/my-table';
import { useLocationParams } from '../hooks/use-location-params';
import { useRouterPush } from '../hooks/use-router-push';
import PageLayout from '../layouts/page-layout';
import { useCreateRoom, useDeleteRoom, useRooms, useUpdateRoom } from '../models/rooms';

const Rooms = () => {
  const { t } = useTranslation();
  const { query } = useLocationParams();
  const { push } = useRouterPush();
  const { data: rooms, isLoading } = useRooms();
  const { mutate: mutateCreateRoom } = useCreateRoom();
  const { mutate: mutateUpdateRoom } = useUpdateRoom();
  const { mutate: mutateDeleteRoom } = useDeleteRoom();
  const [form] = Form.useForm();

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
    [t],
  );

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
    [],
  );

  useEffect(() => {
    if (query.edit && query.id) {
      form.setFieldsValue(rooms?.data?.find((room: any) => room.id === query.id));
    }
  }, [query.edit, query.id, rooms]);

  const onCancel = () => {
    push({
      query: {
        add: undefined,
        edit: undefined,
        view: undefined,
        id: undefined,
      },
    });
    form.resetFields();
  };

  const onFinish = async (values: Record<string, any>) => {
    try {
      if (query.edit && query.id) {
        console.log(values);
        await mutateUpdateRoom({
          id: query.id,
          data: values,
        });
      } else {
        await mutateCreateRoom(values);
      }
      onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <CustomLoader />;

  return (
    <PageLayout title={t('rooms.title')}>
      <MyTable
        deleteFunc={mutateDeleteRoom}
        name="room"
        columns={columns}
        data={
          query.search
            ? rooms?.data.filter((room: any) =>
                room.roomName.toLowerCase().includes((query.search as string).toLowerCase()),
              )
            : rooms?.data
        }
      />
      <MyDrawer form={form} entryPoint="add" title={t('rooms.titleSingular')}>
        <AutoForm
          form={form}
          onFinish={onFinish}
          saveTitle={query.add ? t('crud.create') : t('form.save')}
          cancelTitle={t('form.cancel')}
          fields={fields}
        />
      </MyDrawer>
    </PageLayout>
  );
};

export default Rooms;
