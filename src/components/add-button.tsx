import { Button } from "antd";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useLocationParams } from "../hooks/use-location-params";
import { useRouterPush } from "../hooks/use-router-push";

const AddButton = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouterPush();
  const { query } = useLocationParams();

  return (
    <Button
      icon={<FaPlus />}
      onClick={() => push({ query: { ...query, add: true } })}
      className="flex justify-center items-center border-0 bg-primary-green hover:!bg-lime-600 px-6 py-6 rounded-2xl font-semibold text-center text-lg text-white hover:!text-[#f5f5f5]"
    >
      {children}
    </Button>
  );
};

export default AddButton;
