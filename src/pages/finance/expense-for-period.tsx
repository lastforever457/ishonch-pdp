import { Col, Row } from "antd"
import { useTranslation } from "react-i18next"
import { FaMoneyBills } from "react-icons/fa6"

const ExpenseForPeriod = () => {
  const {t} = useTranslation() 

  return (
    <Row className="mb-7">
      <Col xs={24} sm={24} md={24} lg={12}>
        <div className="flex justify-between items-center bg-white shadow px-5 py-3 rounded-xl">
          <h2 className="font-semibold text-base md:text-xl">
            {t("finance.expenseForPeriod")}:
          </h2>
          <p className="font-bold text-base md:text-xl">6 700 265 UZS</p>
          <FaMoneyBills className="text-2xl text-primary-blue md:text-3xl" />
        </div>
      </Col> 
    </Row>
  )
}

export default ExpenseForPeriod