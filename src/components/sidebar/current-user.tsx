const CurrentUser = () => {
  const currentUser = {
    firstName: "Jamila",
    lastName: "Azimova",
    image: "/images/image.png",
    phone: "+998 99 123 45 67",
  };

  return (
    <div className="flex justify-center lg:justify-start items-center gap-2 w-full">
      <img
        src={currentUser.image}
        className="bg-cover bg-center rounded-full object-cover size-16"
        alt=""
      />
      <div className="flex flex-col p-2">
        <h1 className="font-bold text-base">
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
