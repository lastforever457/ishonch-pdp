import { Button, Dropdown, Popconfirm, Table } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useRouterPush } from '../hooks/use-router-push'
import { useUpdateGroup } from '../models/groups'
import {
    useBlockStudent,
    useSetDebtorStudent,
    useStudents,
} from '../models/students.tsx'
import { CustomLoader } from './loader.tsx'

const MyTable = ({
    name,
    columns,
    data,
    hasActions = true,
    hasDetailPageWithId = false,
    isLoading,
    isError,
    error,
    deleteFunc,
    additionalActions = false,
}: {
    name: string
    columns: any
    data: any
    hasActions?: boolean
    hasDetailPageWithId?: false | string
    isLoading?: boolean
    isError?: boolean
    error?: any
    deleteFunc?: any
    additionalActions?: boolean
}) => {
    const { push } = useRouterPush()
    const { t } = useTranslation()
    const { mutate: updateUserMutate } = useUpdateGroup()
    const { mutate: mutateBlockStudent, isPending: isBlockStudentPending } =
        useBlockStudent()
    const { mutate: mutateDebtorStudent, isPending: isDebtorStudentPending } =
        useSetDebtorStudent()

    const { refetch: refetchStudents, isLoading: isStudentsLoading } =
        useStudents()

    const extendedColumns = useMemo(
        () =>
            [
                {
                    key: 'number',
                    title: '#',
                    dataIndex: 'number',
                    render: (_: any, __: any, index: number) => index + 1,
                },
                ...columns,
                hasActions && {
                    key: 'actions',
                    title: t('actions.actions'),
                    dataIndex: 'actions',
                    fixed: 'right',
                    render: (_: any, record: Record<string, any>) => (
                        <Dropdown
                            menu={{
                                items: [
                                    ...(additionalActions
                                        ? [
                                              {
                                                  key: 'block',
                                                  label: t('students.block'),
                                                  onClick: () => {
                                                      mutateBlockStudent(
                                                          record?.id as string
                                                      )
                                                      setTimeout(
                                                          () =>
                                                              refetchStudents(),
                                                          500
                                                      )
                                                  },
                                              },
                                          ]
                                        : []),
                                    ...(additionalActions
                                        ? [
                                              {
                                                  key: 'debtor',
                                                  label: t('students.debtor'),
                                                  onClick: () => {
                                                      mutateDebtorStudent(
                                                          record?.id as string
                                                      )
                                                      setTimeout(
                                                          () =>
                                                              refetchStudents(),
                                                          500
                                                      )
                                                  },
                                              },
                                          ]
                                        : []),
                                    {
                                        key: 'edit',
                                        label: t('crud.edit'),
                                        onClick: () => {
                                            if (name === 'groups') {
                                                updateUserMutate(
                                                    record.id.toString()
                                                )
                                            } else {
                                                push({
                                                    query: {
                                                        edit: true,
                                                        id: record.id,
                                                    },
                                                })
                                            }
                                        },
                                    },
                                    {
                                        key: 'delete',
                                        label: (
                                            <Popconfirm
                                                title={t(
                                                    'formMessages.confirmDelete'
                                                )}
                                                okText={t('crud.delete')}
                                                cancelText={t('form.cancel')}
                                                onConfirm={() =>
                                                    deleteFunc(
                                                        record.id.toString()
                                                    )
                                                }
                                            >
                                                {t('crud.delete')}
                                            </Popconfirm>
                                        ),
                                    },
                                ],
                            }}
                            trigger={['click']}
                        >
                            <Button
                                type="text"
                                icon={<BsThreeDotsVertical />}
                            />
                        </Dropdown>
                    ),
                },
            ].filter(Boolean),
        [columns, hasActions, t]
    )

    if (isError) {
        return <div>{error.message}</div>
    }

    if (isDebtorStudentPending || isStudentsLoading || isBlockStudentPending)
        return <CustomLoader />

    return (
        <Table
            columns={extendedColumns}
            dataSource={data}
            loading={isLoading}
            rowKey={(record) => record.id || record.key}
            scroll={{ x: 'max-content' }}
        />
    )
}
export default MyTable
