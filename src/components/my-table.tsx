import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Table } from "antd";

interface Column {
  key: string;
  title: string;
  dataIndex: string;
}

interface Row {
  [key: string]: any;
}

const MyTable = ({ columns, data }: { columns: Column[]; data: Row[] }) => {
  const handleMenuClick = (action: string, record: Row) => {
    console.log(`${action} clicked for`, record);
  };

  const getMenu = (record: Row) => (
    <Menu>
      <Menu.Item key="change" onClick={() => handleMenuClick("Change", record)}>
        Change
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleMenuClick("Delete", record)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const extendedColumns = [
    ...columns,
    {
      key: "actions",
      title: "",
      render: (_: any, record: Row) => (
        <Dropdown overlay={getMenu(record)} trigger={["click"]}>
          <Button
            type="text"
            icon={<EllipsisOutlined />}
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <Table
      columns={extendedColumns}
      dataSource={data}
      rowKey={(record) => record.id}
      pagination={false}
    />
  );
};

export default MyTable;
