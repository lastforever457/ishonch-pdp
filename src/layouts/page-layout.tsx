import { Divider } from "antd";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import AddButton from "../components/add-button";

const PageLayout = ({
  children,
  segmented,
  addButton = true,
  title,
}: {
  children: ReactNode;
  segmented?: ReactNode;
  addButton?: boolean;
  title: string;
}) => {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">{title}</h1>
        <div className="flex justify-center items-center gap-7">
          {segmented ? segmented : null}
          {addButton && <AddButton>{t("crud.add")}</AddButton>}
        </div>
      </div>
      <Divider />
      {children}
    </div>
  );
};

export default PageLayout;
