import { Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { CustomLoader } from '../../components/loader'
import { useCourseFees } from '../../models/finance'
import { EmployeeCard } from '../employees/employee-id/employee-id'
import ExpenseForPeriod from './expense-for-period'

const CourseFees = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useCourseFees()
  if (isLoading) return <CustomLoader />
  return (
    <>
      <ExpenseForPeriod expense={data?.['total price']} isLoading={false} />
      <Row className="mt-7">
        <Col xs={24} sm={24} md={24} lg={12}>
          <EmployeeCard
            title={t('finance.courses')}
            value={
              <span className="font-semibold">{t('employees.amount')}</span>
            }
            hasShadow={false}
            customClass="rounded-xl"
          />
          <div className="flex flex-col gap-5">
            {data?.['Course fees']?.map((item: Record<string, any>) => (
              <EmployeeCard
                key={`${item.id}_${item.courseName}`}
                title={item.courseName}
                value={item.course_fee}
                bgWhite={true}
                hasShadow={false}
                customClass="rounded-xl"
              />
            ))}
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CourseFees
