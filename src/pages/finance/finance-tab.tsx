import { Button, Col, DatePicker, Form, Row } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
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
  const { data, isLoading: isFinanceLoading } = useFinance()
  const { push } = useRouterPush()
  const [form] = Form.useForm()

  const financeData = useMemo(() => {
    if (!data || !Array.isArray(data)) return []
    let filteredData = data[0] || []

    if (query.startDate && query.endDate) {
      const startDate = dayjs(query.startDate as string, 'YYYY-MM-DD').startOf(
        'day'
      )
      const endDate = dayjs(query.endDate as string, 'YYYY-MM-DD').endOf('day')

      filteredData = filteredData.filter((item: Record<string, any>) => {
        const itemDate = dayjs(item.date)
        return itemDate.isAfter(startDate) && itemDate.isBefore(endDate)
      })
    }

    if (query.search) {
      const searchQuery = query.search.toString().toLowerCase()
      filteredData = filteredData.filter((item: Record<string, any>) =>
        item.name.toLowerCase().includes(searchQuery)
      )
    }

    return filteredData
  }, [data, query.startDate, query.endDate, query.search])

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
  const [expenseForPeriod, setExpenseForPeriod] = useState<number | undefined>(
    undefined
  )

  useEffect(() => {
    if (query.startDate && query.endDate && data) {
      const amount = financeData.reduce(
        (sum: number, item: Record<string, any>) => {
          return sum + item?.amount
        },
        0
      )
      setExpenseForPeriod(amount)
    } else {
      setExpenseForPeriod(data?.[1])
    }

    form.setFieldsValue({
      startDate: query.startDate
        ? dayjs(query.startDate as string, 'YYYY-MM-DD')
        : null,
      endDate: query.endDate
        ? dayjs(query.endDate as string, 'YYYY-MM-DD')
        : null,
    })
  }, [data, query.startDate, query.endDate])

  const onFilter = (values: Record<string, any>) => {
    push({
      query: {
        ...query,
        startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
      },
    })
  }

  if (isFinanceLoading) return <CustomLoader />
  //@ts-ignore
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form layout="vertical" onFinish={onFilter} form={form}>
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
                  <DatePicker
                    className="rounded-!2xl px-3 py-2 text-xl shadow"
                    format="YYYY-MM-DD"
                    style={{ width: '100%' }}
                  />
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
                  <DatePicker
                    className="rounded-!2xl px-3 py-2 text-xl shadow"
                    format="YYYY-MM-DD"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={24}>
                <div className="flex h-full w-full items-end gap-3 justify-center">
                  <Form.Item>
                    <Button
                      className="bg-primary-gray rounded-xl border-0 px-7 py-5 font-semibold tracking-wider text-white shadow hover:!text-black"
                      onClick={() => {
                        form.setFieldsValue({
                          startDate: undefined,
                          endDate: undefined,
                        })
                        push({
                          query: {
                            ...query,
                            startDate: undefined,
                            endDate: undefined,
                          },
                        })
                      }}
                      htmlType="reset"
                    >
                      {t('form.clear filter')}
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="bg-primary-blue rounded-xl border-0 px-7 py-5 font-semibold tracking-wider text-white shadow hover:!bg-violet-600 hover:!text-white"
                      htmlType="submit"
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
      <ExpenseForPeriod
        expense={expenseForPeriod || data[1]}
        isLoading={isFinanceLoading}
      />
      <MyTable
        name="finance"
        deleteFunc={mutateDeleteFinance}
        columns={columns}
        data={financeData}
      />
    </>
  )
}

export default FinanceTab
