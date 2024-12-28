import { useTranslation } from "react-i18next";
import MySegmented from "../../components/my-segmented";
import { useLocationParams } from "../../hooks/use-location-params";
import PageLayout from "../../layouts/page-layout";
import CourseFees from "./course-fees";
import Debtors from "./debtors";
import FinanceTab from "./finance-tab";

const Finance = () => {
  const { t } = useTranslation();
  const { query } = useLocationParams();

  return (
    <PageLayout
      title={t("finance.title")}
      segmented={
        <MySegmented
          queryName="financeTab"
          segmentedValues={[
            { key: "finance", value: t("finance.title"), isPrimary: true },
            { key: "course-fees", value: t("finance.courseFees") },
            { key: "debtors", value: t("finance.debtors") },
          ]}
        />
      }
    >
      {query.financeTab === "debtors" ? (
        <Debtors />
      ) : query.financeTab === "course-fees" ? (
        <CourseFees />
      ) : (
        <FinanceTab />
      )}
    </PageLayout>
  );
};

export default Finance;
