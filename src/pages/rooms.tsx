import { useTranslation } from "react-i18next";
import AddButton from "../components/add-button";
import Drawer from "../components/rooms/drawer";
import RoomsTable from "../components/rooms/table";
import useRooms from "../query-models/rooms";

const Rooms = () => {
  const { t } = useTranslation();
  const { data: rooms, isLoading, refetch } = useRooms({});

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">{t("rooms")}</h1>
        <AddButton>{t("crud.add")}</AddButton>
      </div>
      <RoomsTable isLoading={isLoading} rooms={rooms || []} />
      <Drawer refetch={refetch} />
    </div>
  );
};

export default Rooms;
