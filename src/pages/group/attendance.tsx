import React, { useState } from "react";
import { Table } from "antd";
import "tailwindcss/tailwind.css";
import { FaCheck, FaTrashAlt, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line, RiEditCircleLine } from "react-icons/ri";

const Attendance = () => {
  const [data, setData] = useState([
    {
      key: "1",
      name: "Alex",
      status1: "absent",
      status2: "absent",
      status3: "present",
      status4: "-",
    },
    {
      key: "2",
      name: "John",
      status1: "present",
      status2: "-",
      status3: "absent",
      status4: "present",
    },
    {
      key: "3",
      name: "Adam",
      status1: "present",
      status2: "-",
      status3: "absent",
      status4: "present",
    },
    {
      key: "4",
      name: "Mike",
      status1: "present",
      status2: "-",
      status3: "absent",
      status4: "present",
    },
    // Add more data as needed
  ]);

  const handleStatusChange = (recordKey: any, columnKey: any) => {
    const newData = data.map((item) => {
      if (item.key === recordKey) {
        const currentStatus = item.key[columnKey];
        const newStatus =
          currentStatus === "present"
            ? "absent"
            : currentStatus === "absent"
              ? "present"
              : "present";
        return { ...item, [columnKey]: newStatus };
      }
      return item;
    });
    setData(newData);
  };

  const renderStatus = (status: any, record: any, columnKey: any) => {
    const isPresent = status === "present";
    const isAbsent = status === "absent";

    return (
      <div
        className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center ${
          isPresent
            ? "bg-green-500 text-white"
            : isAbsent
              ? "bg-red-500 text-white"
              : "bg-gray-200"
        }`}
        onClick={() => handleStatusChange(record.key, columnKey)}
      >
        {isPresent ? <FaCheck /> : isAbsent ? "✖" : "-"}
      </div>
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "22-yan",
      dataIndex: "status1",
      key: "status1",
      render: (status: any, record: any) =>
        renderStatus(status, record, "status1"),
    },
    {
      title: "23-yan",
      dataIndex: "status2",
      key: "status2",
      render: (status: any, record: any) =>
        renderStatus(status, record, "status2"),
    },
    {
      title: "24-yan",
      dataIndex: "status3",
      key: "status3",
      render: (status: any, record: any) =>
        renderStatus(status, record, "status3"),
    },
    {
      title: "25-yan",
      dataIndex: "status4",
      key: "status4",
      render: (status: any, record: any) =>
        renderStatus(status, record, "status4"),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-xl font-semibold mb-4">Web Design</h1>
            </div>
            <div className="flex items-center space-x-2 mt-[-10px] text-[#7338ac]">
              <RiEditCircleLine size={25} className="cursor-pointer" />
              <RiDeleteBin6Line size={25} className="cursor-pointer" />
            </div>
          </div>
          <div className="text-sm space-y-2">
            <p className="font-semibold text-1xl text-[#477082]">Narxi: </p>
            <h2 className="text-2xl font-bold"> 500,000 UZS</h2>
            <p className="font-semibold text-1xl text-[#477082]">Kunlar: </p>
            <h2 className="text-2xl font-bold">Juft kunlari</h2>
            <p className="font-semibold text-1xl text-[#477082]">Xona: </p>
            <h2 className="text-2xl font-bold">Blue Room</h2>
            <p className="font-semibold text-1xl text-[#477082]">
              Boshlanish vaqti :
            </p>
            <h2 className="text-2xl font-bold"> 08:00</h2>
            <p className="font-semibold text-1xl text-[#477082]">
              Boshlanish sanasi:
            </p>
            <h2 className="text-2xl font-bold">2021-01-01</h2>
            <p className="font-semibold text-1xl text-[#477082]">
              Tugash sanasi:
            </p>
            <h2 className="text-2xl font-bold">2021-07-01</h2>
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-semibold">Ismlar: </h2>
            <ul className="space-y-2 mt-2">
              {Array(6)
                .fill("asdsadas")
                .map((name, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>{name}</span>
                    <span className="text-gray-500">94 778 33 73</span>
                    <div className="flex gap-2 text-purple-600">
                      <RiEditCircleLine className="cursor-pointer" />
                      <RiDeleteBin6Line className="cursor-pointer" />
                    </div>
                  </li>
                ))}
              <li className="text-blue-500 cursor-pointer">
                + Add a new Reader
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-2/3">
          <h1 className="text-xl font-semibold mb-4">Davomat</h1>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    </div>
  );
};

export default Attendance;