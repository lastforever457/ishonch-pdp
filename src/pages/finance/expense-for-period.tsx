import { Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { FaMoneyBills } from 'react-icons/fa6'
import { Loader } from '../../components/loader'
import useFinance from '../../models/finance'

const ExpenseForPeriod = () => {
  const { t } = useTranslation()
  const { data: financeData, isLoading } = useFinance()

  if (isLoading) return <Loader />

  return (
    <Row className="mb-7">
      <Col xs={24} sm={24} md={24} lg={12}>
        <div className="flex justify-between items-center bg-white shadow px-5 py-3 rounded-xl">
          <h2 className="font-semibold text-base md:text-xl">
            {t('finance.expenseForPeriod')}:
          </h2>
          <div className="flex justify-center items-center gap-3">
            <p className="font-bold text-base lg:text-lg">
              {new Intl.NumberFormat('en-UZ', {
                style: 'currency',
                currency: 'UZS',
              }).format(financeData[1])}
            </p>
            <FaMoneyBills className="text-2xl md:hidden text-primary-blue md:text-3xl" />
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default ExpenseForPeriod
