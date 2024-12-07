import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Languages = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const activeLang = i18n.language;
  return (
    <div className="flex items-center border-2 border-black rounded-[50px] overflow-hidden">
      <button
        className={`px-4 py-2 flex justify-center items-center ${
          activeLang === "uz"
            ? "bg-primary-gray text-white"
            : "bg-white text-black"
        }`}
        onClick={() => changeLanguage("uz")}
      >
        UZ
      </button>
      <button
        className={`px-4 py-2 flex justify-center items-center ${
          activeLang === "ru"
            ? "bg-primary-gray text-white"
            : "bg-white text-black"
        }`}
        onClick={() => changeLanguage("ru")}
      >
        RU
      </button>
    </div>
  );
};

export default Languages;
