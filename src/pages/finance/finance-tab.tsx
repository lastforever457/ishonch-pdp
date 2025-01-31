import { Button, Col, DatePicker, Form, Row } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomLoader } from '../../components/loader';
import MyTable from '../../components/my-table';
import { useLocationParams } from '../../hooks/use-location-params';
import { useRouterPush } from '../../hooks/use-router-push';
import useFinance, { useDeleteFinance } from '../../models/finance';
import ExpenseForPeriod from './expense-for-period';

const FinanceTab = () => {
  const { t } = useTranslation();
  const { query } = useLocationParams();
  const { mutate: mutateDeleteFinance } = useDeleteFinance();
  const { data: financeData, isLoading: isFinanceLoading } = useFinance();
  const [data, setData] = useState<Record<string, any>[]>(financeData || []);
  const { push } = useRouterPush();
  const [form] = Form.useForm();
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
    [t],
  );

  useEffect(() => {
    if (query.startDate && query.endDate) {
      const startDate = dayjs(query.startDate as string, 'DD-MM-YYYY');
      const endDate = dayjs(query.endDate as string, 'DD-MM-YYYY');
      console.log({ startDate, endDate });

      const remainedData =
        financeData && financeData[0]
          ? financeData[0].filter((item: Record<string, any>) => {
              const itemDate = dayjs(item.date as string, 'DD-MM-YYYY');

              return (
                itemDate.isSame(startDate, 'day') ||
                itemDate.isSame(endDate, 'day') ||
                (itemDate.isAfter(startDate, 'day') && itemDate.isBefore(endDate, 'day'))
              );
            })
          : [];
      console.log('Filtered Data:', remainedData);

      setData(remainedData);
    } else {
      setData(financeData || []); // `financeData` bo'sh bo'lsa, xavfsiz bo'lish uchun default qiymat []
    }
  }, [financeData, query.startDate, query.endDate]);

  const onFilter = (values: Record<string, any>) => {
    console.log(values);
    push({
      query: {
        ...query,
        startDate: dayjs(values.startDate).format('DD-MM-YYYY'),
        endDate: dayjs(values.endDate).format('DD-MM-YYYY'),
      },
    });
  };

  if (isFinanceLoading) return <CustomLoader />;

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form layout="vertical" onFinish={onFilter} form={form}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={<span className="text-base font-semibold">{t('finance.fromDate')}</span>}
                  name="startDate"
                  rules={[{ required: true, message: 'Sanani kiriting' }]}
                >
                  <DatePicker
                    className="rounded-!2xl px-3 py-2 text-xl shadow"
                    format="DD.MM.YYYY"
                    defaultValue={query.startDate && dayjs(query.startDate as string, 'DD-MM-YYYY')}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={<span className="text-base font-semibold">{t('finance.toDate')}</span>}
                  name="endDate"
                  rules={[{ required: true, message: 'Sanani kiriting' }]}
                >
                  <DatePicker
                    defaultValue={query.endDate && dayjs(query.endDate as string, 'DD-MM-YYYY')}
                    className="rounded-!2xl px-3 py-2 text-xl shadow"
                    format="DD.MM.YYYY"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={24}>
                <div className="flex h-full w-full items-end justify-center">
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
      <ExpenseForPeriod />
      <MyTable
        name="finance"
        deleteFunc={mutateDeleteFinance}
        columns={columns}
        data={
          data && data[0]
            ? query.search
              ? data[0].filter((item: Record<string, any>) =>
                  item.name.toLowerCase().includes(query.search?.toString().toLowerCase() as string),
                )
              : data[0]
            : []
        }
      />
    </>
  );
};

export default FinanceTab;
