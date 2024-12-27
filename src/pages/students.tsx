import PageLayout from "../layouts/page-layout.tsx";
import MySegmented from "../components/my-segmented.tsx";
import MyTable from "../components/my-table.tsx";

const Students = () => {
  return <PageLayout title={"Students"} segmented={<MySegmented segmentedValues={[{value: "sdfsdgsd", key: "vsfvfd"}, {value: "dgsgd", key: "sdfsf", isPrimary: true}]} queryName={"studentsTab"}/>}>
    <MyTable columns={
      [{
        key: "firstName",
        title: "F.I.O",
        dataIndex: "fio",
      },
      { key: "phone", title: "Phone", dataIndex: "phone" },
      { key: "role", title: "Role", dataIndex: "role" }
    ]} data={[
      {
        fio: "sdfsdgsd",
        phone: "sdfsdgsd",
        role: "sdfsdgsd",
      },
      {
        fio: "sdfsdgsd",
        phone: "sdfsdgsd",
        role: "sdfsdgsd",
      },
      {
        fio: "sdfsdgsd",
        phone: "sdfsdgsd",
        role: "sdfsdgsd",
      },
      {
        fio: "sdfsdgsd",
        phone: "sdfsdgsd",
        role: "sdfsdgsd",
      },
      {
        fio: "sdfsdgsd",
        phone: "sdfsdgsd",
        role: "sdfsdgsd",
      },
      {
        fio: "sdfsdgsd",
        phone: "sdfsdgsd",
        role: "sdfsdgsd",
      },
      {
        fio: "sdfsdgsd",
        phone: "sdfsdgsd",
        role: "sdfsdgsd"
      }
    ]} />  </PageLayout>;
};

export default Students;
