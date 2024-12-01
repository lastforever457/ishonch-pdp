import { getOneUser } from "../queries/user-queries";

const CurrentUser = () => {
  const data = localStorage.getItem("currentUser");
  const currentUser = JSON.parse(data || "{}");

  return (
    <div className="flex justify-center lg:justify-start items-center">
      <img src={currentUser.photo} className="rounded-full size-16" alt="" />
      <div className="lg:flex flex-col hidden p-2">
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
  const data = await getOneUser(undefined, "ADMIN");
  localStorage.setItem(
    "currentUser",
    JSON.stringify(Array.isArray(data) ? data[0] : data)
  );
};

export default CurrentUser;
