const CurrentUser = () => {
  const currentUser = {
    firstName: "John",
    lastName: "Doe",
    image: "https://randomuser.me/api/portraits/lego/1.jpg",
    phone: "+998 99 999 99 99",
  };

  return (
    <div className="flex justify-center lg:justify-start items-center">
      <img
        src={currentUser.image}
        className="bg-cover bg-center rounded-full object-cover size-16"
        alt=""
      />
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

export default CurrentUser;
