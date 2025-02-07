import { Button, Col, ColorPicker, Row, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MyButton from '../components/my-button'
import PageLayout from '../layouts/page-layout'

const Settings = () => {
  const { t } = useTranslation()
  const [defaultColor, setDefaultColor] = useState<string>(
    document.documentElement.style.getPropertyValue('--theme-color') ||
      '#635AD9'
  )
  const [font, setFont] = useState<string>(
    localStorage.getItem('ishonch-font') || 'inter'
  )
  const [mainColor, setMainColor] = useState<string>('#635AD9')

  useEffect(() => {
    const changeFont = (font: string) => {
      localStorage.setItem('ishonch-font', font)
      const fonts: Record<string, string> = {
        poppins: 'Poppins',
        roboto: 'Roboto',
        'open-sans': 'Open Sans',
        inter: 'Inter',
        lato: 'Lato',
        montserrat: 'Montserrat',
        nunito: 'Nunito',
        raleway: 'Raleway',
        ubuntu: 'Ubuntu',
        'baloo-chettan-2': 'Baloo Chettan 2',
        'times-new-roman': 'Times New Roman',
        arial: 'Arial',
      }

      // body'ga CSS custom property qo‘llash
      document.documentElement.style.setProperty(
        '--main-font',
        fonts[font] || 'Inter'
      )
    }

    changeFont(font)
  }, [font])

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', defaultColor)
  }, [defaultColor, document.documentElement.style])

  return (
    <PageLayout
      addButton={false}
      title={t('settings.title')}
      segmented={
        <MyButton
          onClick={() => {
            localStorage.clear()
            document.documentElement.style.setProperty(
              '--theme-color',
              mainColor
            )
            document.documentElement.style.setProperty('--main-font', 'Inter')
          }}
        >
          {t('settings.resetSettings')}
        </MyButton>
      }
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <div
            className="flex flex-col justify-center gap-3 p-5 rounded-xl h-full"
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
          >
            <span className="font-semibold text-base">
              {t('settings.font')}:
            </span>
            <Select
              style={{ width: '100%' }}
              defaultValue={localStorage.getItem('ishonch-font') || 'inter'}
              placeholder={t('settings.font')}
              onChange={(value: string) => {
                setFont(value)
              }}
              options={[
                {
                  label: 'Poppins',
                  value: 'poppins',
                },
                {
                  label: 'Roboto',
                  value: 'roboto',
                },
                {
                  label: 'Open Sans',
                  value: 'open-sans',
                },
                {
                  label: 'Inter',
                  value: 'inter',
                },
                {
                  label: 'Lato',
                  value: 'lato',
                },
                {
                  label: 'Montserrat',
                  value: 'montserrat',
                },
                {
                  label: 'Nunito',
                  value: 'nunito',
                },
                {
                  label: 'Raleway',
                  value: 'raleway',
                },
                {
                  label: 'Ubuntu',
                  value: 'ubuntu',
                },
                {
                  label: 'Baloo Chettan 2',
                  value: 'baloo-chettan-2',
                },
                {
                  label: 'Times New Roman',
                  value: 'times-new-roman',
                },
                {
                  label: 'Arial',
                  value: 'arial',
                },
              ]}
            ></Select>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <div
            className="flex flex-col justify-center gap-3 p-5 rounded-xl h-full"
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
          >
            <span className="font-semibold text-base">
              {t('settings.mainColor')}:
            </span>
            <div className="flex items-center gap-3">
              <ColorPicker
                defaultValue={defaultColor}
                onChange={(e: any) => setMainColor(e.toHexString())}
              />
              <Button
                onClick={() => {
                  document.documentElement.style.setProperty(
                    '--theme-color',
                    mainColor
                  )
                  localStorage.setItem('theme-color', mainColor)
                  setDefaultColor(mainColor)
                }}
              >
                {t('form.save')}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </PageLayout>
  )
}

export default Settings
