import { Divider } from "antd";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useLocationParams } from "../hooks/use-location-params";
import { useRouterPush } from "../hooks/use-router-push";

interface DrawerProps {
  entryPoint: string;
  title: string;
  children: React.ReactNode;
  position?: "left" | "right";
}

const MyDrawer: React.FC<DrawerProps> = ({
  entryPoint,
  title,
  children,
  position = "right",
}) => {
  const { push } = useRouterPush();
  const { query } = useLocationParams();

  const closeDrawer = () => {
    push({
      query: {
        ...query,
        [entryPoint]: undefined,
        id: undefined,
        view: undefined,
        edit: undefined,
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-start ${
        position === "left" ? "justify-start" : "justify-end"
      } ${
        query[entryPoint] ? "visible opacity-100" : "invisible opacity-0"
      } transition-all duration-300`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={closeDrawer}
      ></div>
      <div
        className={`relative flex  w-full max-w-lg h-screen overflow-y-auto transform transition-all duration-300 ease-in-out ${
          query[entryPoint]
            ? "translate-x-0"
            : position === "left"
            ? "-translate-x-[100%]"
            : "translate-x-[100%]"
        }`}
      >
        <div className="relative bg-opacity-60 w-[15%]">
          <div
            style={{
              borderTopLeftRadius: "40px",
              borderBottomLeftRadius: "40px",
            }}
            className="flex justify-center items-center bg-white mt-32"
          >
            <button onClick={closeDrawer} className="px-4 py-3 text-3xl">
              <IoClose />
            </button>
          </div>
        </div>
        <div className="bg-white px-12 py-10 w-full">
          <h1 className="mb-4 font-bold text-xl">{title}</h1>
          <Divider />
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyDrawer;
