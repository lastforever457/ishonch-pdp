import { Button, Col, DatePicker, Form, Row } from 'antd'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomLoader } from '../../components/loader'
import { useLocationParams } from '../../hooks/use-location-params'
import { useRouterPush } from '../../hooks/use-router-push'
import { useCourseFees } from '../../models/finance'
import { EmployeeCard } from '../employees/employee-id/employee-id'
import ExpenseForPeriod from './expense-for-period'

const CourseFees = () => {
  const { t } = useTranslation()
  const { query } = useLocationParams()
  const { data, isLoading } = useCourseFees()
  const { push } = useRouterPush()
  const [form] = Form.useForm()

  const filteredData = useMemo(() => {
    if (!data || !query.startDate || !query.endDate)
      return data?.['Course fees']
    const startDate = dayjs(query.startDate as string)
    const endDate = dayjs(query.endDate as string)
    return data?.['Course fees']?.filter(
      (item: Record<string, any>) =>
        (dayjs(item.openedDate).isSame(startDate) ||
          dayjs(item.openedDate).isAfter(startDate)) &&
        (dayjs(item.openedDate).isSame(endDate) ||
          dayjs(item.openedDate).isBefore(endDate))
    )
  }, [data, query])

  const expenseForPeriod = useMemo(() => {
    if (!data || !query.startDate || !query.endDate)
      return data?.['total price']
    return filteredData?.reduce(
      (sum: number, item: Record<string, any>) => sum + item.course_fee,
      0
    )
  }, [filteredData, data, query])

  const onFilter = (values: Record<string, any>) => {
    push({
      query: {
        ...query,
        startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
      },
    })
  }

  if (isLoading) return <CustomLoader />
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
      <ExpenseForPeriod expense={expenseForPeriod} isLoading={false} />
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
            {filteredData?.map((item: Record<string, any>) => (
              <EmployeeCard
                key={`${item.openedDate}_${item.course_fee}_${item.courseName}`}
                title={item.courseName}
                value={new Intl.NumberFormat('en-UZ', {
                  style: 'currency',
                  currency: 'UZS',
                }).format(item.course_fee)}
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
