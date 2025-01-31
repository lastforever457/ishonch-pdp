import { Form, message, Modal, Select } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'
import { RiDeleteBin6Line, RiEditCircleLine } from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import { CustomLoader } from '../../components/loader'
import MyButton from '../../components/my-button'
import MyTable from '../../components/my-table'
import { useGroupAttendance, useGroupProfile } from '../../models/groups'
import {
  useConnectStudentToGroup,
  useDisconnectStudentFromGroup,
  useStudentsWithoutGroup,
} from '../../models/students'

interface Student {
  id: string
  firstname: string
  lastname: string
  phoneNumber: string
}

interface GroupData {
  id: string
  courseName: string
  groupPrice: number
  startDate: string
  endDate: string
  startTime: string
  room?: { roomName: string }
  students: Student[]
  stNumber: number
  days: string[]
}

const convertDaytoEnglish = (day: string): string => {
  const daysMap: Record<string, string> = {
    Dushanba: 'Monday',
    Seshanba: 'Tuesday',
    Chorshanba: 'Wednesday',
    Payshanba: 'Thursday',
    Juma: 'Friday',
    Shanba: 'Saturday',
    Yakshanba: 'Sunday',
    Juft_kun: 'Even_days',
    Toq_kun: 'Odd_days',
  }
  return daysMap[day] || day
}

const convertMonth = (month: string): string => {
  const monthsMap: Record<string, string> = {
    January: 'jan',
    February: 'feb',
    March: 'mar',
    April: 'apr',
    May: 'may',
    June: 'jun',
    July: 'jul',
    August: 'aug',
    September: 'sep',
    October: 'oct',
    November: 'nov',
    December: 'dec',
  }
  return monthsMap[month] || month
}

const Attendance: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>()
  const { t } = useTranslation()
  const [attendanceData, setAttendanceData] = useState<Record<string, string>>(
    {}
  )
  const [open, setOpen] = useState<boolean>(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const { mutate: connectStudentToGroup } = useConnectStudentToGroup()
  const { mutate: disconnectStudentFromGroup } = useDisconnectStudentFromGroup()
  const { data: groupData, refetch } = useGroupProfile(groupId)
  const { data: studentsWithoutGroup } = useStudentsWithoutGroup()
  const { data: groupAttendance } = useGroupAttendance(groupId)

  useEffect(() => {
    console.log({ groupAttendance })
    if (groupId) {
      refetch()
    }
  }, [groupId, refetch])

  const renderStatus = useCallback(
    (status: string | null, record: Student, date: any) => {
      const current = dayjs(new Date())
      return (
        <div
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ${
            status === 'present'
              ? 'bg-green-500 text-white'
              : status === 'absent'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200'
          }`}
          onClick={(e) => {
            e.stopPropagation()
            console.log({
              current: current.format('DD-MM-YYYY'),
              date: date.format('DD-MM-YYYY'),
            })
            if (current.isSame(date, 'day')) {
              const newStatus = status === 'present' ? 'absent' : 'present'
              setAttendanceData((prev) => ({
                ...prev,
                [record.id]: newStatus,
              }))
            }
          }}
        >
          {status === 'present' ? (
            <FaCheck />
          ) : status === 'absent' ? (
            '✖'
          ) : (
            '-'
          )}
        </div>
      )
    },
    []
  )

  const handleSubmitAttendance = async () => {
    try {
      console.log({ groupId, attendanceData })
      // Assume submitAttendance is an API call
      // await submitAttendance({ groupId, attendanceData });
      message.success('Attendance submitted successfully')
    } catch (error) {
      message.error('Failed to submit attendance')
    }
  }

  const lessons = useMemo(() => {
    const lessonsArray: Array<Record<string, any>> = []
    if (
      groupData?.startDate &&
      groupData?.endDate &&
      Array.isArray(groupData.days)
    ) {
      const startDate = dayjs(groupData.startDate)
      const endDate = dayjs(groupData.endDate)
      let current = startDate

      while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
        const currentDate = current.clone()
        console.log({ current: currentDate.format('DD-MM-YYYY') })
        const weekDay = currentDate.format('dddd')
        const isEven = currentDate.date() % 2 === 0
        const isOdd = !isEven

        const allowedDays = groupData.days.map(convertDaytoEnglish)
        if (
          allowedDays.includes(weekDay) ||
          (allowedDays.includes('Even_days') && isEven) ||
          (allowedDays.includes('Odd_days') && isOdd)
        ) {
          lessonsArray.push({
            title: `${currentDate.format('DD')} - ${t(`month.${convertMonth(currentDate.format('MMMM'))}`)}`,
            dataIndex: currentDate.format('DD-MM-YYYY'),
            key: currentDate.format('DD-MM-YYYY'),
            render: (text: any, record: Student) => {
              const studentId = record.id
              const status = attendanceData[studentId] || null
              return renderStatus(status, record, currentDate)
            },
          })
        }
        current = current.add(1, 'day')
      }
    }
    return lessonsArray
  }, [
    groupData?.startDate,
    groupData?.endDate,
    groupData?.days,
    attendanceData,
  ])
  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      ...lessons,
    ],
    [lessons]
  )

  if (!groupData || !studentsWithoutGroup) return <CustomLoader />

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full rounded-lg bg-white p-6 shadow-md md:w-1/3">
          <div className="mb-1 flex items-center justify-between">
            <h1 className="mb-4 text-xl font-semibold">
              {groupData.courseName}
            </h1>
            <div className="flex items-center space-x-2 text-[#7338ac]">
              <Link
                to="/groups"
                className={'text-xl font-bold hover:text-blue-500'}
              >
                <BsArrowReturnLeft size={25} />
              </Link>
              <RiEditCircleLine size={25} className="cursor-pointer" />
              <RiDeleteBin6Line size={25} className="cursor-pointer" />
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-1xl font-semibold text-[#477082]">Narxi: </p>
            <h2 className="text-2xl font-bold">
              {groupData.groupPrice.toLocaleString()} UZS
            </h2>
            <p className="text-1xl font-semibold text-[#477082]">Kunlar: </p>
            <h2 className="text-2xl font-bold">Juft kunlari</h2>
            <p className="text-1xl font-semibold text-[#477082]">Xona: </p>
            <h2 className="text-2xl font-bold">{groupData?.room?.roomName}</h2>
            <p className="text-1xl font-semibold text-[#477082]">
              Boshlanish vaqti :
            </p>
            <h2 className="text-2xl font-bold">
              {new Date(groupData?.startTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </h2>
            <p className="text-1xl font-semibold text-[#477082]">
              Boshlanish sanasi:
            </p>
            <h2 className="text-2xl font-bold">{groupData?.startDate}</h2>
            <p className="text-1xl font-semibold text-[#477082]">
              Tugash sanasi:
            </p>
            <h2 className="text-2xl font-bold">{groupData?.endDate}</h2>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <h2 className="font-semibold">Ismlar: </h2>
            <p>{groupData?.stNumber}</p>
            <div className="flex cursor-pointer text-blue-400 hover:text-blue-600">
              <p onClick={() => setOpen(true)}>{t('crud.add')}</p>
            </div>
            <ul className="mt-2 space-y-2">
              {groupData?.students.map((item: Student, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span>
                    {item.firstname} {item.lastname}
                  </span>
                  <span className="text-gray-500">
                    {item.phoneNumber.startsWith('+998')
                      ? item.phoneNumber
                      : `+998${item.phoneNumber}`}
                  </span>
                  <div
                    onClick={() =>
                      disconnectStudentFromGroup({
                        studentId: item.id,
                        groupId: groupId ? groupId : '',
                      })
                    }
                    className="flex gap-2 text-purple-600"
                  >
                    <RiDeleteBin6Line className="cursor-pointer" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full rounded-lg bg-white p-6 shadow-md md:w-2/3">
          <h1 className="mb-4 text-xl font-semibold">Davomat</h1>
          <MyTable
            name="attendance"
            columns={columns}
            data={groupData?.students.map((student: Record<string, any>) => ({
              key: student.id,
              id: student.id,
              name: `${student.firstname} ${student.lastname}`,
            }))}
            hasActions={false}
          />
          <div className="flex items-center justify-end">
            <MyButton onClick={handleSubmitAttendance}>
              {t('form.save')}
            </MyButton>
          </div>
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
            message.success('Student connected to group successfully')
          } catch (e) {
            console.error(e)
            message.error('Error connecting student to group')
          }
        }}
      >
        <Form>
          <Form.Item rules={[{ required: true }]}>
            <Select
              className="w-full"
              onChange={(value) => setSelectedStudent(value)}
            >
              {studentsWithoutGroup?.data.map((student: Student) => (
                <Select.Option key={student.id} value={student.id}>
                  {student.firstname} {student.lastname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Attendance
