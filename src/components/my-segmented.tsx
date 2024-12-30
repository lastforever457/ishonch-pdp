import { ReactNode } from "react";
import { useLocationParams } from "../hooks/use-location-params";
import { useRouterPush } from "../hooks/use-router-push";

interface SegmentedProps {
  value: string | ReactNode;
  key: string;
  isPrimary?: boolean;
}

const MySegmented = ({
  queryName,
  segmentedValues,
}: {
  queryName: string;
  segmentedValues: SegmentedProps[];
}) => {
  const { push } = useRouterPush();
  const { query } = useLocationParams();

  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
      className="flex bg-white mt-3 md:mt-0 p-1 rounded-2xl w-fit text-sm md:text-xl select-none"
    >
      {segmentedValues.map((item: Record<string, any>) => (
        <div
          key={item.key}
          onClick={() => push({ query: { ...query, [queryName]: item.key } })}
          className={`p-2 md:px-3 lg:px-6 md:py-2.5 lg:py-3 cursor-pointer segmented-item rounded-xl flex justify-center font-bold items-center  ${
            !query[queryName] && item.isPrimary
              ? "bg-primary-blue rounded-xl text-white"
              : query[queryName] === item.key
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

export default MySegmented;
