import { Alert } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/images/logo.png" alt="" />
      <Alert
        message={t('403.title')}
        description={t('403.description')}
        type="error"
        showIcon
        className="mb-4"
      />
      <Link to="/login" className="text-blue-500 hover:underline">
        {t('login.title')}
      </Link>
    </div>
  )
}

export default Unauthorized
