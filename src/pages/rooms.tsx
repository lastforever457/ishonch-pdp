import { useTranslation } from "react-i18next";
import PageLayout from "../layouts/page-layout";

const Rooms = () => {
  const { t } = useTranslation();
  return <PageLayout title={t("rooms.title")}>s</PageLayout>;
};

export default Rooms;
