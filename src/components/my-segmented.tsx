import { useLocationParams } from "../hooks/use-location-params";
import { useRouterPush } from "../hooks/use-router-push";

interface SegmentedProps {
  value: string;
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
      className="flex bg-white p-1 rounded-2xl text-xl segmented"
    >
      {segmentedValues.map((item: Record<string, any>) => (
        <div
          key={item.key}
          onClick={() => push({ query: { ...query, [queryName]: item.key } })}
          className={`px-6 py-3 cursor-pointer segmented-item rounded-xl flex justify-center font-bold items-center ${
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
