import { Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { FaMoneyBills } from 'react-icons/fa6'
import { CustomLoader } from '../../components/loader'

const ExpenseForPeriod = ({
  expense,
  isLoading,
}: {
  expense: number | string
  isLoading: boolean
}) => {
  const { t } = useTranslation()

  if (isLoading) return <CustomLoader />

  return (
    <Row className="mb-7">
      <Col xs={24} sm={24} md={24} lg={12}>
        <div className="flex items-center justify-between rounded-xl bg-white px-5 py-3 shadow">
          <h2 className="text-base font-semibold md:text-xl">
            {t('finance.expenseForPeriod')}:
          </h2>
          <div className="flex items-center justify-center gap-3">
            <p className="text-base font-bold lg:text-lg">
              {new Intl.NumberFormat('en-UZ', {
                style: 'currency',
                currency: 'UZS',
              }).format(Number(expense))}
            </p>
            <FaMoneyBills className="text-primary-blue text-2xl md:hidden md:text-3xl" />
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default ExpenseForPeriod
