const CurrentUser = () => {
  const data = localStorage.getItem("currentUser");
  const currentUser = {};

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

export default CurrentUser;
