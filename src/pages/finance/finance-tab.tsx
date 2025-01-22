import { Button, Col, DatePicker, Form, Row } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader } from '../../components/loader'
import MyTable from '../../components/my-table'
import { useLocationParams } from '../../hooks/use-location-params'
import useFinance from '../../models/finance'
import ExpenseForPeriod from './expense-for-period'

const FinanceTab = () => {
  const { t } = useTranslation()
  const { query } = useLocationParams()
  const { data: financeData, isLoading: isFinanceLoading } = useFinance()

  const columns = useMemo(
    () => [
      {
        key: 'name',
        title: t('finance.name'),
        dataIndex: 'name',
      },
      {
        key: 'date',
        title: t('form.date'),
        dataIndex: 'date',
      },
      {
        key: 'category',
        title: t('finance.category'),
        dataIndex: 'category',
      },
      {
        key: 'amount',
        title: t('employees.amount'),
        dataIndex: 'amount',
        render: (text: number | string) =>
          new Intl.NumberFormat('en-UZ', {
            style: 'currency',
            currency: 'UZS',
          }).format(Number(text)),
      },
    ],
    [t]
  )

  if (isFinanceLoading) return <Loader />

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span className="font-semibold text-base">
                        {t('finance.fromDate')}
                      </span>
                    }
                    name="startDate"
                    rules={[{ required: true, message: 'Sanani kiriting' }]}
                  >
                    <DatePicker
                      className="shadow px-3 py-2 rounded-!2xl text-xl"
                      format="DD.MM.YYYY"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span className="font-semibold text-base">
                        {t('finance.toDate')}
                      </span>
                    }
                    name="endDate"
                    rules={[{ required: true, message: 'Sanani kiriting' }]}
                  >
                    <DatePicker
                      className="shadow px-3 py-2 rounded-!2xl text-xl"
                      format="DD.MM.YYYY"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24}>
                  <div className="flex justify-center items-end w-full h-full">
                    <Form.Item>
                      <Button
                        className="border-0 bg-primary-blue hover:!bg-violet-600 shadow px-7 py-5 rounded-xl font-semibold text-white hover:!text-white tracking-wider"
                        htmlType="submit"
                      >
                        Filter
                      </Button>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      <ExpenseForPeriod />
      <MyTable
        name="finance"
        columns={columns}
        data={
          financeData && financeData[0]
            ? query.search
              ? financeData[0].filter((item: Record<string, any>) =>
                  item.name
                    .toLowerCase()
                    .includes(query.search?.toString().toLowerCase() as string)
                )
              : financeData[0]
            : []
        }
      />
    </>
  )
}

export default FinanceTab
