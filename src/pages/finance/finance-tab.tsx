import { Button, Col, DatePicker, Form, FormInstance, Row } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomLoader } from '../../components/loader'
import MyTable from '../../components/my-table'
import { useLocationParams } from '../../hooks/use-location-params'
import { useRouterPush } from '../../hooks/use-router-push'
import useFinance, { useDeleteFinance } from '../../models/finance'
import ExpenseForPeriod from './expense-for-period'

const FinanceTab = () => {
  const { t } = useTranslation()
  const { query } = useLocationParams()
  const { mutate: mutateDeleteFinance } = useDeleteFinance()
  const { data: financeData, isLoading: isFinanceLoading } = useFinance()
  const { push } = useRouterPush()
  const [form] = Form.useForm()

  const filteredData = useMemo(() => {
    if (!financeData) return []

    let filtered = financeData

    if (query.startDate && query.endDate) {
      const startDate = dayjs(query.startDate as string, 'DD-MM-YYYY')
      const endDate = dayjs(query.endDate as string, 'DD-MM-YYYY')

      filtered = filtered.filter((item: any) => {
        const itemDate = dayjs(item.date, 'DD-MM-YYYY')
        return (
          (itemDate.isAfter(startDate, 'day') &&
            itemDate.isBefore(endDate, 'day')) ||
          itemDate.isSame(startDate, 'day')
        )
      })
    }

    if (query.search) {
      const searchText = query.search.toString().toLowerCase()
      filtered = filtered.filter((item: any) =>
        item.name.toLowerCase().includes(searchText)
      )
    }

    return filtered
  }, [financeData, query.startDate, query.endDate, query.search])

  useEffect(() => {
    if (query.startDate && query.endDate) {
      form.setFieldsValue({
        startDate: dayjs(query.startDate as string, 'DD-MM-YYYY'),
        endDate: dayjs(query.endDate as string, 'DD-MM-YYYY'),
      })
    }
  }, [query.startDate, query.endDate])

  useEffect(() => {
    if (form.getFieldsValue(['startDate', 'endDate'])) {
      push({ query: { ...query, startDate: undefined, endDate: undefined } })
      form.setFieldsValue({ startDate: undefined, endDate: undefined })
    }
  }, [query.startDate, query.endDate])

  const onFilter = (values: any) => {
    push({
      query: {
        ...query,
        startDate: dayjs(values.startDate).format('DD-MM-YYYY'),
        endDate: dayjs(values.endDate).format('DD-MM-YYYY'),
      },
    })
  }

  if (isFinanceLoading) return <CustomLoader />

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form
            layout="vertical"
            onFinish={onFilter}
            form={form as FormInstance}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className="text-base font-semibold">
                      {t('finance.fromDate')}
                    </span>
                  }
                  name="startDate"
                  rules={[{ required: true, message: t('formMessages.date') }]}
                >
                  <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className="text-base font-semibold">
                      {t('finance.toDate')}
                    </span>
                  }
                  name="endDate"
                  rules={[{ required: true, message: t('formMessages.date') }]}
                >
                  <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={24}>
                <div className="flex h-full w-full items-end gap-3 justify-center">
                  <Form.Item>
                    <Button
                      htmlType="reset"
                      className="bg-primary-gray rounded-xl text-white shadow"
                    >
                      {t('form.clear filter')}
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      className="bg-primary-blue rounded-xl text-white shadow"
                    >
                      Filter
                    </Button>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <ExpenseForPeriod expense={5000} isLoading={isFinanceLoading} />
      <MyTable
        name="finance"
        deleteFunc={mutateDeleteFinance}
        columns={[
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
        ]}
        data={filteredData}
      />
    </>
  )
}

export default FinanceTab
