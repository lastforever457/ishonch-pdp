import { Form } from 'antd'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AutoForm } from '../../components/auto-form'
import MyDrawer from '../../components/my-drawer'
import MySegmented from '../../components/my-segmented'
import { useLocationParams } from '../../hooks/use-location-params'
import { useRouterPush } from '../../hooks/use-router-push'
import PageLayout from '../../layouts/page-layout'
import { useCreateFinance } from '../../models/finance'
import CourseFees from './course-fees'
import Debtors from './debtors'
import FinanceTab from './finance-tab'

const Finance = () => {
  const { t } = useTranslation()
  const { query } = useLocationParams()
  const { push } = useRouterPush()
  const { mutate: mutateCreateFinance } = useCreateFinance()
  const [form] = Form.useForm()

  const onCancel = () => {
    push({
      query: {
        add: undefined,
        edit: undefined,
        view: undefined,
        id: undefined,
      },
    })
  }

  const onFinish = async (values: any) => {
    try {
      await mutateCreateFinance({
        ...values,
        date: dayjs(values.date).format('YYYY-MM-DD'),
      })
    } catch (error) {
      console.log(error)
    }
  }

  const financeFields = useMemo(
    () => [
      {
        label: t('finance.name'),
        name: 'name',
        type: 'text',
        rules: [{ required: true, message: t('formMessages.name') }],
      },
      {
        label: t('form.date'),
        name: 'date',
        type: 'datepicker',
        rules: [{ required: true, message: t('formMessages.date') }],
      },
      {
        label: t('finance.category'),
        name: 'category',
        type: 'text',
        rules: [{ required: true, message: t('formMessages.category') }],
      },
      {
        label: t('employees.amount'),
        name: 'amount',
        type: 'text',
        rules: [{ required: true, message: t('formMessages.amount') }],
      },
    ],
    [t]
  )

  return (
    <PageLayout
      title={
        query.financeTab === 'debtors'
          ? t('finance.debtors')
          : query.financeTab === 'course-fees'
            ? t('finance.courseFees')
            : t('finance.title')
      }
      addButton={query.financeTab === 'finance' || !query.financeTab}
      segmented={
        <MySegmented
          queryName="financeTab"
          segmentedValues={[
            { key: 'finance', value: t('finance.title'), isPrimary: true },
            { key: 'course-fees', value: t('finance.courseFees') },
            { key: 'debtors', value: t('finance.debtors') },
          ]}
        />
      }
    >
      {query.financeTab === 'debtors' ? (
        <Debtors />
      ) : query.financeTab === 'course-fees' ? (
        <CourseFees />
      ) : (
        <FinanceTab />
      )}

      <MyDrawer form={form} entryPoint="add" title={t('crud.add')}>
        <AutoForm
          form={form}
          onFinish={onFinish}
          saveTitle={query.add ? t('crud.create') : t('form.save')}
          cancelTitle={t('form.cancel')}
          fields={financeFields}
        />
      </MyDrawer>
    </PageLayout>
  )
}

export default Finance
