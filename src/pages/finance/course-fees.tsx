import { Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { courseFees } from '../../test-data'
import { EmployeeCard } from '../employees/employee-id/employee-id'
import ExpenseForPeriod from './expense-for-period'

const CourseFees = () => {
  const { t } = useTranslation()

  return (
    <>
      <ExpenseForPeriod />
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
            {courseFees.map((item: Record<string, any>) => (
              <EmployeeCard
                key={item.id}
                title={item.name}
                value={item.amount}
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
