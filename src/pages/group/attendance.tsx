import { Form, message, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { RiDeleteBin6Line, RiEditCircleLine } from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import { Loader } from '../../components/loader'
import MyTable from '../../components/my-table'
import { useGroupProfile } from '../../models/groups'
import {
  useConnectStudentToGroup,
  useStudentsWithoutGroup,
} from '../../models/students'

const Attendance = () => {
  const { groupId } = useParams()
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const { mutate: connectStudentToGroup } = useConnectStudentToGroup()
  const { data: groupData, refetch, isLoading } = useGroupProfile(groupId || '')
  const {
    data: studentsWithoutGroup,
    isLoading: isStudentsWithoutGroupLoading,
  } = useStudentsWithoutGroup()

  useEffect(() => {
    refetch()
  }, [groupId])

  const renderStatus = (status: any, record: any, columnKey: any) => {
    const isPresent = status === 'present'
    const isAbsent = status === 'absent'

    return (
      <div
        className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center ${
          isPresent
            ? 'bg-green-500 text-white'
            : isAbsent
              ? 'bg-red-500 text-white'
              : 'bg-gray-200'
        }`}
        // onClick={() => handleStatusChange(record.key, columnKey)}
      >
        {isPresent ? <FaCheck /> : isAbsent ? '✖' : '-'}
      </div>
    )
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '22-yan',
      dataIndex: 'status1',
      key: 'status1',
      render: (status: any, record: any) =>
        renderStatus(status, record, 'status1'),
    },
    {
      title: '23-yan',
      dataIndex: 'status2',
      key: 'status2',
      render: (status: any, record: any) =>
        renderStatus(status, record, 'status2'),
    },
    {
      title: '24-yan',
      dataIndex: 'status3',
      key: 'status3',
      render: (status: any, record: any) =>
        renderStatus(status, record, 'status3'),
    },
    {
      title: '25-yan',
      dataIndex: 'status4',
      key: 'status4',
      render: (status: any, record: any) =>
        renderStatus(status, record, 'status4'),
    },
  ]

  if (isLoading) return <Loader />
  if (isStudentsWithoutGroupLoading) return <Loader />

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-xl font-semibold mb-4">
                {groupData.courseName}
              </h1>
            </div>
            <div className="flex items-center space-x-2 mt-[-10px] text-[#7338ac]">
              <Link
                to="/groups"
                className={'hover:text-blue-500 text-xl font-bold'}
              >
                <BsArrowReturnLeft size={25} />
              </Link>
              <RiEditCircleLine size={25} className="cursor-pointer" />
              <RiDeleteBin6Line size={25} className="cursor-pointer" />
            </div>
          </div>
          <div className="text-sm space-y-2">
            <p className="font-semibold text-1xl text-[#477082]">Narxi: </p>
            <h2 className="text-2xl font-bold">
              {groupData.groupPrice.toString().toLocaleString()} UZS
            </h2>
            <p className="font-semibold text-1xl text-[#477082]">Kunlar: </p>
            <h2 className="text-2xl font-bold">Juft kunlari</h2>
            <p className="font-semibold text-1xl text-[#477082]">Xona: </p>
            <h2 className="text-2xl font-bold">{groupData?.room?.roomName}</h2>
            <p className="font-semibold text-1xl text-[#477082]">
              Boshlanish vaqti :
            </p>
            <h2 className="text-2xl font-bold">
              {new Date(groupData?.startTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </h2>
            <p className="font-semibold text-1xl text-[#477082]">
              Boshlanish sanasi:
            </p>
            <h2 className="text-2xl font-bold">{groupData?.startDate}</h2>
            <p className="font-semibold text-1xl text-[#477082]">
              Tugash sanasi:
            </p>
            <h2 className="text-2xl font-bold">{groupData?.endDate}</h2>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Ismlar: </h2>
              <p>{groupData?.stNumber}</p>
            </div>
            <div className="flex text-blue-400 hover:text-blue-600 cursor-pointer">
              <p onClick={() => setOpen(true)}>{t('crud.add')}</p>
            </div>
            <ul className="space-y-2 mt-2">
              {groupData?.students.map(
                (item: Record<string, any>, index: number) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>
                      {item.firstname || ''} {item.lastname || ''}
                    </span>
                    <span className="text-gray-500">
                      {item.phoneNumber.startsWith('+998')
                        ? item.phoneNumber
                        : `+998${item.phoneNumber}`}
                    </span>
                    <div className="flex gap-2 text-purple-600">
                      <RiDeleteBin6Line className="cursor-pointer" />
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-2/3">
          <h1 className="text-xl font-semibold mb-4">Davomat</h1>
          <MyTable
            name="attendance"
            columns={columns}
            data={groupData?.students.map((student: Record<string, any>) => {
              return {
                key: student.id,
                id: student.id,
                name: student.firstname + ' ' + student.lastname,
              }
            })}
            hasActions={false}
          />
        </div>
      </div>
      <Modal
        title={t('crud.add')}
        open={open}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onOk={async () => {
          try {
            await connectStudentToGroup({
              groupId: groupData.id,
              studentId: selectedStudent ? parseInt(selectedStudent) : 0,
            })
            setOpen(false)
          } catch (e) {
            console.error(e)
            message.error('Error')
          }
        }}
      >
        <Form>
          <Form.Item rules={[{ required: true }]}>
            <Select
              className="w-full"
              onChange={(value) => setSelectedStudent(value)}
            >
              {studentsWithoutGroup?.data.map(
                (student: Record<string, any>) => {
                  return (
                    <Select.Option key={student.id} value={student.id}>
                      {student.firstname || ''} {student.lastname || ''}
                    </Select.Option>
                  )
                }
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Attendance
