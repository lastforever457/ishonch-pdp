import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AutoForm } from "../components/auto-form";
import PageLayout from "../layouts/page-layout";

const Settings = () => {
  const {t} = useTranslation()
  const [theme, setTheme] = useState(localStorage.getItem("ishonch-theme") || "light")

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark")
  }, [theme])

  const fields = useMemo(
    () => [
      {
        name: "theme",
        label: t("settings.theme"),
        type: "radio",
        options: [
          {
            label: t("settings.light"),
            value: "light"
          },
          {
            label: t("settings.dark"),
            value: "dark"
          }
        ],
        onChange: (e: any) => {setTheme(e.target.value); localStorage.setItem("ishonch-theme", e.target.value)}
      },
    ],
    [t]
  )

  return <PageLayout addButton={false} title={t("settings.title")}>
    <AutoForm fields={fields}/>
  </PageLayout>;
};

export default Settings;
