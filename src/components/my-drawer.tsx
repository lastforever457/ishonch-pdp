import { Drawer } from "antd";
import { useMemo } from "react";
import { useLocationParams } from "../hooks/use-location-params";

const MyDrawer = ({
  children,
  entryPoint,
  title,
}: {
  children: React.ReactNode;
  entryPoint: string;
  title: string;
}) => {
  const { query } = useLocationParams();
  const entryPointValue = useMemo(() => query[entryPoint], [query[entryPoint]]);

  return (
    <Drawer closable={false} open={!!entryPointValue as boolean} title={title}>
      {children}
    </Drawer>
  );
};

export default MyDrawer;
