import { Button } from "antd";
import React from "react";
import { FaPlus } from "react-icons/fa";

const AddButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      icon={<FaPlus />}
      className="border-0 bg-primary-green hover:!bg-lime-600 px-6 py-6 rounded-2xl font-semibold text-lg text-white hover:!text-[#f5f5f5]"
    >
      {children}
    </Button>
  );
};

export default AddButton;
