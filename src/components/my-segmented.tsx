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
    <div className="flex bg-white shadow-2xl p-0.5 rounded-2xl text-xl segmented">
      {segmentedValues.map((item: Record<string, any>) => (
        <div
          key={item.key}
          onClick={() => push({ query: { ...query, [queryName]: item.key } })}
          className={`px-6 py-3 cursor-pointer segmented-item flex justify-center font-bold items-center ${
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
