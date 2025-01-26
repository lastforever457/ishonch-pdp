import { useEffect, useState } from 'react'
import i18n from '../../i18n/i18n'

const Languages = () => {
  const [activeLang, setActiveLang] = useState<string>(i18n.languages[0])
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
    setActiveLang(lang)
  }

  return (
    <div className="flex items-center border-2 border-black rounded-[50px] overflow-clip">
      <button
        className={`px-3 py-1.5 md:px-4 md:py-2 flex justify-center items-center w-full ${
          activeLang === 'uz'
            ? 'bg-primary-gray text-white'
            : 'bg-white text-black'
        }`}
        onClick={() => changeLanguage('uz')}
      >
        UZ
      </button>
      <button
        className={`px-3 py-1.5 md:px-4 md:py-2 flex justify-center items-center w-full ${
          activeLang === 'ru'
            ? 'bg-primary-gray text-white'
            : 'bg-white text-black'
        }`}
        onClick={() => changeLanguage('ru')}
      >
        RU
      </button>
    </div>
  )
}

export default Languages
