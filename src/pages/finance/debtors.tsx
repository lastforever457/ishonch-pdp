import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomLoader } from '../../components/loader'
import MyTable from '../../components/my-table'
import { useUsers } from '../../models/users'

const Debtors = () => {
  const { t } = useTranslation()
  const { data: teachers, isLoading: isTeachersLoading } = useUsers('TEACHER')
  const columns = useMemo(
    () => [
      {
        title: t('form.name'),
        dataIndex: 'firstname',
        key: 'firstname',
      },
      {
        title: t('form.lastName'),
        dataIndex: 'lastname',
        key: 'lastname',
      },
      {
        title: t('form.phone'),
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        ellipsis: {
          showTitle: false,
        },
      },
    ],
    [t]
  )

  if (isTeachersLoading) return <CustomLoader />

  return (
    <MyTable
      name="finance"
      hasActions={false}
      columns={columns}
      data={teachers?.data}
    />
  )
}

export default Debtors
