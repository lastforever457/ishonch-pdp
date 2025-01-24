import { Col, Form, Row } from 'antd'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPencilAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { AutoForm } from '../../../components/auto-form'
import { Loader } from '../../../components/loader'
import { useUpdateUser, useUser } from '../../../models/users'
import { EmployeeCard } from './employee-id'

const Profile = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { mutate: mutateUser } = useUpdateUser()
  const { data: currentEmployee, isLoading: isEmployeeLoading } = useUser(
    id as string
  )

  useEffect(() => {
    if (currentEmployee) {
      form.setFieldsValue(currentEmployee[0])
    }
  }, [currentEmployee])

  const fields = useMemo(
    () => [
      {
        key: 'phoneNumber',
        name: 'phoneNumber',
        label: t('form.phone'),
        type: 'text',
        addonBefore: '+998',
      },
      {
        key: 'password',
        name: 'password',
        label: t('form.password'),
        type: 'password',
      },
      {
        key: 'balance',
        name: 'balance',
        label: t('employees.balance'),
        type: 'text',
        defaultValue: 0,
      },
      {
        key: 'role',
        name: 'role',
        label: t('form.role'),
        type: 'select',
        options: [
          {
            label: t('employees.teacher'),
            value: 'TEACHER',
          },
          {
            label: t('students.titleSingular'),
            value: 'STUDENT',
          },
        ],
      },
      {
        key: 'branch',
        name: 'branch',
        label: t('employees.branch'),
        type: 'text',
        defaultValue: 'ZIYO-NUR ILM MARKAZI',
        readOnly: true,
      },
    ],
    []
  )

  const onFinish = async () => {
    const data = form.getFieldsValue()
    await mutateUser({
      id,
      data: {
        ...data,
        ...currentEmployee[0],
        phoneNumber: `+998${data.phoneNumber}`,
      },
    })
  }

  if (isEmployeeLoading) return <Loader />

  return (
    <Row gutter={[26, 16]}>
      <Col xs={24} sm={24} md={24} lg={8}>
        <div
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          }}
          className="px-10 py-10 w-full h-full"
        >
          <div className="flex justify-end items-center">
            <button
              onClick={onFinish}
              className="bg-primary-orange p-2 border border-black rounded-full"
            >
              <FaPencilAlt />
            </button>
          </div>
          <div className="flex justify-center items-center">
            <img
              className="border-2 bg-cover bg-center border-black rounded-full object-cover size-44"
              src={
                currentEmployee?.image ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              }
              alt=""
            />
          </div>
          <h1 className="mt-2 font-bold text-center text-xl">
            {currentEmployee
              ? currentEmployee[0]?.firstname +
                ' ' +
                currentEmployee[0]?.lastname
              : 'Loading...'}
          </h1>
          <p className="text-[#888] text-base text-center">
            (ID: {currentEmployee[0]?.id})
          </p>
          <div className="flex flex-col justify-start items-start mt-5">
            <AutoForm form={form} hideButtons={true} fields={fields} />
          </div>
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={16}>
        <div className="flex flex-col mb-7">
          <h1 className="mb-2 font-bold text-3xl">{t('groups.title')}</h1>
          <Row gutter={[26, 16]}>
            {currentEmployee && currentEmployee[1]?.length > 0 ? (
              currentEmployee[1]?.map((group: Record<string, any>) => (
                <Col xs={24} sm={24} md={24} lg={24} xxl={12} key={group.id}>
                  <div
                    style={{
                      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    }}
                    className="flex justify-between items-center bg-white p-5"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="bg-primary-blue shadow-md px-3 py-1.5 rounded-xl font-semibold text-white">
                        {group.groupName}
                      </h3>
                      <p className="text-base uppercase tracking-wide">
                        {group.courseName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-base text-stone-500">
                      <p>
                        {group.startTime
                          ? new Date(group.startTime).toDateString()
                          : group.startTime}
                      </p>
                      <p>
                        {group.startTime
                          ? new Date(group.startTime).toLocaleString('ru-RU', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : group.startTime}
                      </p>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <div
                style={{
                  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                }}
                className="flex justify-between items-center bg-white p-5"
              >
                {t('formMessages.noData')}
              </div>
            )}
          </Row>
        </div>
        <div className="flex flex-col">
          <h1 className="mb-2 font-bold text-3xl">{t('employees.payments')}</h1>
          <div className="flex flex-col gap-7 bg-white shadow-md w-full overflow-hidden">
            <EmployeeCard
              title={t('employees.dateOfPayment')}
              value="12.11.2024"
            />
            <EmployeeCard
              title={t('groups.title')}
              value={
                currentEmployee &&
                `${currentEmployee[1][0].groupName} ${currentEmployee[1][0].courseName}`
              }
            />
            <EmployeeCard title={t('employees.amount')} value="300 000 UZS" />
            <EmployeeCard title={t('form.comment')} value="Lorem Ipsum" />
            <EmployeeCard
              title={t('employees.whoPaid')}
              value={
                currentEmployee &&
                `${currentEmployee[0].firstname.slice(0, 1)}. ${currentEmployee[0].lastname}`
              }
            />
            <EmployeeCard
              title={t('employees.howManyStudents')}
              value={currentEmployee && currentEmployee[1][0].stNumber}
            />
            <EmployeeCard title={t('employees.credit')} value="300 000 UZS" />
            <EmployeeCard
              title={t('employees.return')}
              value={
                <p className="flex justify-center items-center bg-red-500 px-3 py-1.5 rounded-xl font-semibold text-white">
                  Return
                </p>
              }
            />
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default Profile
