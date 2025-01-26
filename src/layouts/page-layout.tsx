import { Col, Divider, Row } from "antd";
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
    <div className="w-full">
      <div className="flex justify-between w-full">
        <Row className="w-full">
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="flex justify-between items-center w-full h-full">
              <h1 className="font-bold text-3xl lg:text-4xl tracking-wide">
                {title}
              </h1>
              <span className="flex md:hidden">
                {addButton && <AddButton>{t("crud.add")}</AddButton>}
              </span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="flex md:flex-row flex-col justify-center md:justify-end md:items-center gap-7">
              {segmented ? segmented : null}
              <span className="md:flex hidden">
                {addButton && <AddButton>{t("crud.add")}</AddButton>}
              </span>
            </div>
          </Col>
        </Row>
      </div>
      <Divider />
      <div className="h-[60vh]">{children}</div>
    </div>
  );
};

export default PageLayout;
