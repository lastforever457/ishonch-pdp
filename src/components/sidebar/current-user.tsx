import { useLoaderData } from "react-router-dom";
import { IUser } from "../../interfaces";
import { getOneUser } from "../queries/user-queries";

const CurrentUser = () => {
  const data = useLoaderData<IUser[]>();
  const currentUser = data[0];

  return (
    <div className="flex items-center">
      <img src={currentUser.photo} className="rounded-full size-16" alt="" />
      <div className="flex flex-col p-2">
        <h1 className="font-bold">
          {currentUser.firstName || ""} {currentUser.lastName || ""}
        </h1>
        <p className="font-semibold text-[#888] text-base">
          {currentUser.phone}
        </p>
      </div>
    </div>
  );
};

export const loader = async () => {
  const data = getOneUser("", "ADMIN");
  return data;
};

export default CurrentUser;
