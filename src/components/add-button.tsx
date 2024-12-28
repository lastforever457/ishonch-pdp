import React from "react";
import { FaPlus } from "react-icons/fa";
import { useLocationParams } from "../hooks/use-location-params";
import { useRouterPush } from "../hooks/use-router-push";

const AddButton = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouterPush();
  const { query } = useLocationParams();

  return (
    <button
      onClick={() => push({ query: { ...query, add: true } })}
      className="flex justify-center items-center border-0 bg-primary-green hover:!bg-lime-600 px-6 py-3 rounded-2xl font-semibold text-center text-lg text-white hover:!text-[#f5f5f5]"
    >
      <FaPlus className="mr-2" />
      {children}
    </button>
  );
};

export default AddButton;
