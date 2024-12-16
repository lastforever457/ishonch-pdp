import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocationParams } from "../../hooks/use-location-params";
import { useRouterPush } from "../../hooks/use-router-push";

const GroupSegmented = () => {
  const { t } = useTranslation();
  const { push } = useRouterPush();
  const { query } = useLocationParams();

  const segmentedValues = useMemo(
    () => [
      {
        value: t("employeesPage.active"),
        key: "active",
      },
      {
        value: t("archive"),
        key: "archive",
      },
    ],
    [t]
  );

  return (
    <div className="flex bg-white shadow-2xl p-0.5 rounded-2xl text-xl segmented">
      {segmentedValues.map((item: Record<string, any>) => (
        <div
          key={item.key}
          onClick={() => push({ query: { groupTab: item.key } })}
          className={`px-6 py-3 cursor-pointer segmented-item flex justify-center font-bold items-center ${
            query.groupTab === item.key ||
            (!query.groupTab && item.key === "active")
              ? "bg-primary-blue rounded-xl text-white"
              : "text-[#8f8f8f]"
          }`}
        >
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default GroupSegmented;
