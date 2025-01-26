import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  ColorPicker,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Skeleton,
  Space,
  Switch,
  TimePicker,
} from 'antd'
import { FormInstance, Rule } from 'antd/es/form'
import { isString } from 'lodash-es'
import { CSSProperties, FC, Key, memo, ReactNode, useState } from 'react'
import {
  FiMinusCircle as MinusCircleOutlined,
  FiPlus as PlusOutlined,
} from 'react-icons/fi'

import { UploadListType } from 'antd/es/upload/interface'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useLocationParams } from '../hooks/use-location-params'
import { useRouterPush } from '../hooks/use-router-push'

const { RangePicker } = DatePicker
const { TextArea } = Input

export type ListItemContainer = {
  children: ReactNode
  field: FormField
  index: number
  remove: () => void
}

export type SelectMode = 'multiple' | 'tags' | undefined

export type FormField = {
  label?: string | ReactNode
  addonBefore?: string
  addonAfter?: string
  listLabel?: string
  labelContainer?: string
  name: string
  type?: string
  rules?: Rule[] | undefined
  className?: string
  options?: { label: string | ReactNode; value: string | boolean | number }[]
  mode?: SelectMode
  showSelectAll?: boolean
  dynamic?: boolean
  readOnly?: boolean
  placeholder?: string
  rows?: number
  min?: number
  max?: number
  loading?: boolean
  defaultValue?: any
  accept?: string
  span?: number
  autoSize?: boolean
  childFields?: FormField[]
  addButton?: string | ReactNode
  collapse?: boolean
  ListItemContainer?: FC<ListItemContainer>
  colStyle?: CSSProperties
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
  listType?: UploadListType
  fileMultiple?: boolean
  showTime?: boolean
  onChange?: any
  onSearch?: any
}

export const AutoForm = memo(
  ({
    form,
    fields,
    onFinish,
    isSaveLoading,
    cancelTitle = 'Cancel',
    saveTitle,
    columnSize = 1,
    xsColumnSize = 1,
    mdColumnSize,
    smColumnSize,
    lgColumnSize,
    xlColumnSize,
    xxlColumnSize,
    className,
    inline,
    hideButtons,
    view = false,
    loading,
    onValuesChange,
  }: {
    form?: FormInstance<any>
    fields: FormField[]
    onFinish?: (values: any) => void
    isSaveLoading?: boolean
    cancelTitle?: string
    saveTitle?: string
    columnSize?: number
    mdColumnSize?: number
    xsColumnSize?: number
    smColumnSize?: number
    lgColumnSize?: number
    xlColumnSize?: number
    xxlColumnSize?: number
    className?: string
    inline?: boolean
    hideButtons?: boolean
    view?: boolean
    loading?: boolean
    onValuesChange?: (changedValues: any, allValues: any) => void
  }) => {
    const { t } = useTranslation()
    const { query } = useLocationParams()
    const { push } = useRouterPush()
    const onCancel = () => {
      push({
        query: {
          add: undefined,
          edit: undefined,
          view: undefined,
          id: undefined,
        },
      })
      form && form.resetFields()
    }
    return (
      <div className="antd-inputs">
        <Form
          form={form}
          name="basic"
          layout={'vertical'}
          onFinish={onFinish}
          autoComplete="off"
          onValuesChange={onValuesChange || (() => {})}
          className={clsx({
            'flex gap-2': inline,
            [className as string]: className,
          })}
        >
          <Row gutter={loading ? [30, 30] : 16}>
            {fields.map((field, index) => (
              <Col
                key={isString(field.name) ? field.name : index}
                span={field.span || 24 / columnSize}
                style={field.colStyle}
                xs={field.xs || (xsColumnSize ? 24 / xsColumnSize : undefined)}
                sm={field.sm || (smColumnSize ? 24 / smColumnSize : undefined)}
                md={field.md || (mdColumnSize ? 24 / mdColumnSize : undefined)}
                lg={field.lg || (lgColumnSize ? 24 / lgColumnSize : undefined)}
                xl={field.xl || (xlColumnSize ? 24 / xlColumnSize : undefined)}
                xxl={
                  field.xxl || (xxlColumnSize ? 24 / xxlColumnSize : undefined)
                }
              >
                {loading ? (
                  <div className={'flex flex-col gap-3'}>
                    <Skeleton
                      active
                      title={{ width: '30%' }}
                      paragraph={false}
                    />
                    <Skeleton.Input
                      active
                      size={'large'}
                      style={{ width: '70%' }}
                    />
                  </div>
                ) : (
                  <Field
                    fieldName={field.name}
                    field={field}
                    form={form as FormInstance}
                    columnSize={columnSize}
                    onChange={field.onChange}
                    view={view}
                  />
                )}
              </Col>
            ))}
          </Row>

          {!hideButtons && (
            <div
              className={'mb-0 mt-5 flex items-center justify-end text-right'}
            >
              {onCancel && (
                <Button className={'mr-4'} onClick={() => onCancel()}>
                  {cancelTitle}
                </Button>
              )}
              <Button
                className="bg-primary-green hover:!bg-lime-600 text-white hover:!text-white"
                htmlType="submit"
                loading={isSaveLoading}
              >
                {query.edit && query.id ? t('crud.edit') : t('crud.create')}
              </Button>
            </div>
          )}
        </Form>
      </div>
    )
  }
)

const Field = memo(
  ({
    field,
    form,
    fieldName,
    fullFieldName,
    columnSize = 1,
    onChange,
    view,
  }: {
    field: FormField
    fieldName: any
    fullFieldName?: any
    form: FormInstance<any>
    columnSize?: number
    onChange: any
    view?: boolean
  }) => {
    if (!fullFieldName) fullFieldName = fieldName
    if (!field.type && field.options) field.type = 'select'
    if (!field.type && field.childFields) field.type = 'list'
    const { t } = useTranslation()
    const { query } = useLocationParams()
    const [selectedValues, setSelectedValues] = useState<any[]>(
      field.defaultValue || []
    )
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(
      field.defaultValue?.length === field.options?.length
    )

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        const allValues = field.options?.map((option) => option.value)
        form.setFieldValue(fieldName, allValues)
        setSelectedValues(allValues || [])
      } else {
        form.setFieldValue(fieldName, [])
        setSelectedValues([])
      }
      setIsSelectAllChecked(checked)
    }

    const handleSelectChange = (value: any) => {
      if (onChange) onChange(value)
      form.setFieldValue(fieldName, value)
      setSelectedValues(value)
      setIsSelectAllChecked(value?.length === field.options?.length)
    }

    if (field.dynamic && field.type != 'list')
      return (
        <>
          <div className={'mb-2 mt-2 block'}>{field.label}</div>
          <Form.List key={field.name} name={field.name}>
            {(listFields, { add, remove }, { errors }) => (
              <>
                {listFields.map((listField, index) => (
                  <Form.Item
                    // label={index === 0 ? field.label : ''}
                    required={false}
                    key={listField.key}
                  >
                    <Form.Item
                      validateTrigger={['onChange', 'onBlur']}
                      {...listField}
                      noStyle
                    >
                      {field.type === 'textarea' ? (
                        <TextArea
                          rows={field.rows || 4}
                          autoSize={field.autoSize}
                          className={`my-0 mr-2 ${field.className || ''}`}
                          placeholder={field.placeholder || ''}
                          disabled={view}
                        />
                      ) : (
                        <Input
                          type={field.type || 'text'}
                          className={`my-0 mr-2 ${field.className || ''}`}
                          placeholder={field.placeholder || ''}
                          disabled={view}
                        />
                      )}
                    </Form.Item>
                    <Button
                      type={'text'}
                      onClick={() => remove(listField.name)}
                    >
                      <MinusCircleOutlined />
                    </Button>
                  </Form.Item>
                ))}

                <Form.Item className={'mb-2'}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className={'px-6'}
                  >
                    {t("Qo'shish")}
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </>
      )

    // if (loading) {
    //   return (
    //     <Form.Item
    //       style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30px' }}
    //       className={`my-2 ${field.className || ''}`}
    //     >
    //       <Skeleton active title={{ width: '80%' }} paragraph={{ width: '100%' }} />
    //     </Form.Item>
    //   );
    // }

    switch (field.type) {
      case 'checkbox':
        return (
          <Form.Item
            label={''}
            name={fieldName}
            rules={field.rules}
            className={`mb-0 ${field.className || ''}`}
            valuePropName="checked"
          >
            <Checkbox disabled={field.readOnly || view}>{field.label}</Checkbox>
          </Form.Item>
        )

      case 'bigInt':
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            className={`my-2 ${field.className || ''}`}
            rules={[
              ...(field.rules || []),
              {
                pattern: /^\d+(.\d+)?$/,
                message: 'Value should contain just number',
              },
              {
                pattern: /^[\d+(.\d+)?]{0,100}$/,
                message: 'Value should be less than 100 character',
              },
            ]}
            validateTrigger="onBlur"
            initialValue={field.defaultValue}
          >
            <Input
              type={'text'}
              autoComplete={'off'}
              disabled={field.readOnly || view}
            />
          </Form.Item>
        )

      case 'rangePicker':
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            rules={field.rules}
            className={`my-2 ${field.className || ''}`}
          >
            <RangePicker
              disabled={field.readOnly || view}
              showTime={field.showTime}
              className={'w-full'}
            />
          </Form.Item>
        )

      // case "file":
      //   return (
      //     <>
      //       <Form.Item
      //         label={field.label}
      //         name={fieldName}
      //         rules={field.rules}
      //         className={`mb-0 mt-2 ${field.className || ""}`}
      //         css={css`
      //           .ant-form-item-control-input {
      //             display: none !important;
      //             max-height: 0 !important;
      //           }
      //         `}
      //       >
      //         <Input
      //           css={css`
      //             display: none !important;
      //           `}
      //           disabled={view}
      //         />
      //       </Form.Item>
      //       <UploadInput
      //         form={form}
      //         field={{ ...field, name: fullFieldName }}
      //         view={!!view}
      //       />
      //     </>
      //   );

      case 'radio':
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            rules={field.rules}
            className={`my-2 ${field.className || ''}`}
          >
            <Radio.Group disabled={field.readOnly || view} onChange={onChange}>
              {field.options?.map((option) => (
                <Radio
                  key={option.label as Key}
                  disabled={!!query.view}
                  value={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        )

      // case "md":
      //   return (
      //     <Form.Item
      //       label={field.label}
      //       name={fieldName}
      //       rules={field.rules}
      //       className={`my-2 ${field.className || ""}`}
      //       initialValue={field.defaultValue}
      //     >
      //       <MdInput field={field} />
      //     </Form.Item>
      //   );

      case 'switch':
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            valuePropName="checked"
            className={`my-2 ${field.className || ''}`}
          >
            <Switch
              disabled={field.readOnly || view}
              defaultChecked={field.defaultValue}
            />
          </Form.Item>
        )

      case 'password':
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            rules={field.rules}
            className={`my-2 ${field.className || ''}`}
            initialValue={field.defaultValue}
          >
            <Input.Password
              addonBefore={field.addonBefore}
              addonAfter={field.addonAfter}
              autoComplete={'new-password'}
              disabled={field.readOnly || view}
            />
          </Form.Item>
        )

      case 'number':
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            rules={field.rules}
            className={`my-2 ${field.className || ''}`}
            initialValue={field.defaultValue}
          >
            <InputNumber
              addonBefore={field.addonBefore}
              addonAfter={field.addonAfter}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              defaultValue={field.defaultValue}
              disabled={field.readOnly || view}
            />
          </Form.Item>
        )

      case 'select':
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            rules={field.rules}
            className={`my-2 ${field.className || ''}`}
            initialValue={field.defaultValue}
          >
            <Select
              placeholder={t('select')}
              allowClear
              mode={field.mode}
              options={field.options}
              onChange={handleSelectChange}
              dropdownRender={(menu) => (
                <>
                  {field.showSelectAll && (
                    <>
                      <Space style={{ padding: '8px' }}>
                        <Checkbox
                          indeterminate={
                            selectedValues?.length > 0 &&
                            selectedValues?.length < field.options!.length
                          }
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          checked={isSelectAllChecked}
                        >
                          {t('Hammasini belgilash')}
                        </Checkbox>
                      </Space>
                      <Divider style={{ margin: '0px' }} />
                    </>
                  )}
                  {menu}
                </>
              )}
              showSearch
              filterOption={(input, option) =>
                ((option?.label || '') as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              disabled={field.readOnly || view}
            />
          </Form.Item>
        )

      case 'autocomplete': {
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            rules={field.rules}
            className={`my-2 ${field.className || ''}`}
            initialValue={field.defaultValue}
          >
            <AutoComplete
              onSearch={field.onSearch}
              options={field.options}
              disabled={field.readOnly || view}
            />
          </Form.Item>
        )
      }

      case 'textarea':
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            rules={field.rules}
            className={`my-2 ${field.className || ''}`}
            initialValue={field.defaultValue}
          >
            <TextArea
              rows={field.rows || 4}
              placeholder={field.placeholder || ''}
              disabled={field.readOnly || view}
              autoSize={field.autoSize}
            />
          </Form.Item>
        )

      case 'datepicker':
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            rules={field.rules}
            className={`my-2 ${field.className || ''}`}
          >
            <DatePicker
              style={{ minWidth: 150 }}
              disabled={field.readOnly || view}
              format={'YYYY-MM-DD'}
            />
          </Form.Item>
        )

      case 'timepicker':
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            rules={field.rules}
            className={`my-2 ${field.className || ''}`}
          >
            <TimePicker
              showSecond={false}
              format={'HH:mm'}
              disabled={field.readOnly || view}
            />
          </Form.Item>
        )

      case 'colorpicker':
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            rules={field.rules}
            className={`my-2 ${field.className || ''}`}
            initialValue={field.defaultValue}
          >
            <ColorPicker
              defaultValue={field.defaultValue}
              disabled={field.readOnly || view}
            />
          </Form.Item>
        )

      default:
        return (
          <Form.Item
            label={field.label}
            name={fieldName}
            rules={field.rules}
            className={`my-2 ${field.className || ''}`}
            initialValue={field.defaultValue}
          >
            <Input
              addonBefore={field.addonBefore}
              addonAfter={field.addonAfter}
              type={field.type || 'text'}
              autoComplete={'off'}
              disabled={field.readOnly || view}
            />
          </Form.Item>
        )
    }
  }
)
