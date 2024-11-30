import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocationParams } from "../../hooks/use-location-params";
import { useRouterPush } from "../../hooks/use-router-push";

const Segmented = () => {
  const { t } = useTranslation();
  const { push } = useRouterPush();
  const { query } = useLocationParams();

  const segmentedValues = useMemo(
    () => [
      {
        value: t("archive"),
        key: "archive",
      },
      {
        value: t("teachers"),
        key: "teachers",
      },
      {
        value: t("other employees"),
        key: "other",
      },
    ],
    [t]
  );

  return (
    <div className="flex bg-white shadow-2xl p-0.5 rounded-2xl text-xl segmented">
      {segmentedValues.map((item: Record<string, any>) => (
        <div
          key={item.key}
          onClick={() => push({ query: { employeeTab: item.key } })}
          className={`px-6 py-3 cursor-pointer segmented-item flex justify-center font-bold items-center ${
            query.employeeTab === item.key ||
            (!query.employeeTab && item.key === "teachers")
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

export default Segmented;
