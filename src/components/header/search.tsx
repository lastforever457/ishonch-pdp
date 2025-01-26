import { Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { FaSearch } from 'react-icons/fa'
import { useLocationParams } from '../../hooks/use-location-params'
import { useRouterPush } from '../../hooks/use-router-push'

const Search = () => {
  const { t } = useTranslation()
  const { push } = useRouterPush()
  const { query } = useLocationParams()
  return (
    <Input
      defaultValue={query.search as string}
      placeholder={t('form.search')}
      className="bg-secondary-bg px-5 py-3 rounded-full font-bold text-lg text-primary-gray placeholder:text-primary-gray"
      suffix={<FaSearch className="font-bold text-lg" />}
      onChange={(event: any) =>
        push({ query: { ...query, search: event?.target?.value } })
      }
    />
  )
}

export default Search
