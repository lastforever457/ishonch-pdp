import { Col, Form, Row } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPencilAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { AutoForm } from '../../../components/auto-form'
import { filials } from '../../../test-data'
import { EmployeeCard } from './employee-id'

const Profile = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [currentEmployee, setCurrentEmployee] = useState<
    Record<string, any> | undefined
  >()
  const [currentEmployeeGroups, setCurrentEmployeeGroups] = useState<
    Record<string, any> | undefined
  >()

  // useEffect(() => {
  //   if (id) {
  //     const employee = users.find(
  //       (user: Record<string, any>) => user.id === Number(id)
  //     )
  //     const employeeGroups = groups.filter(
  //       (group: Record<string, any>) =>
  //         group.teacherId.toString() === id.toString()
  //     )
  //     if (employee) {
  //       setCurrentEmployee(employee)
  //     }

  //     if (employeeGroups) {
  //       setCurrentEmployeeGroups(employeeGroups)
  //     }
  //   }
  // }, [id])

  useEffect(() => {
    if (currentEmployee) {
      form.setFieldsValue(currentEmployee)
    }
  }, [currentEmployee])

  const fields = useMemo(
    () => [
      {
        key: 'phone',
        name: 'phone',
        label: t('form.phone'),
        type: 'text',
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
        defaultValue: currentEmployee?.branchId.toString(),
        type: 'select',
        options: filials.map((filial: Record<string, any>) => ({
          label: filial.name,
          value: filial.id.toString(),
        })),
      },
    ],
    []
  )
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
            <button className="bg-primary-orange p-2 border border-black rounded-full">
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
              ? currentEmployee?.firstName + ' ' + currentEmployee?.lastName
              : 'Loading...'}
          </h1>
          <p className="text-[#888] text-base text-center">
            (id: {currentEmployee?.id})
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
            {currentEmployeeGroups?.map((group: Record<string, any>) => (
              <Col xs={24} sm={24} md={24} lg={24} xxl={12} key={group.id}>
                <div
                  style={{
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                  }}
                  className="flex justify-between items-center bg-white p-5"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="bg-primary-blue shadow-md px-3 py-1.5 rounded-xl font-semibold text-white">
                      {group.name}
                    </h3>
                    <p className="text-base tracking-wide">{group.direction}</p>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-base text-stone-500">
                    <p>{group.startTime}</p>
                    <p>{t(`employees.${group.dayType}`)}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div className="flex flex-col">
          <h1 className="mb-2 font-bold text-3xl">{t('employees.payments')}</h1>
          <div className="flex flex-col gap-7 bg-white shadow-md w-full overflow-hidden">
            <EmployeeCard
              title={t('employees.dateOfPayment')}
              value="12.11.2024"
            />
            <EmployeeCard title={t('groups.title')} value="-" />
            <EmployeeCard title={t('employees.amount')} value="300 000 UZS" />
            <EmployeeCard title={t('form.comment')} value="Lorem Ipsum" />
            <EmployeeCard title={t('employees.whoPaid')} value="Ra. Abdulloh" />
            <EmployeeCard title={t('employees.howManyStudents')} value={'44'} />
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
