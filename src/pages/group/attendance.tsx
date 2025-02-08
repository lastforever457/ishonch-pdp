import { Button, Form, message, Modal, Popconfirm, Select, Tooltip } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { MdBlock } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TiTick, TiTimes } from 'react-icons/ti'
import { Link, useParams } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import { CustomLoader } from '../../components/loader'
import MyButton from '../../components/my-button'
import MyTable from '../../components/my-table'
import {
  useDeleteGroup,
  useGroupAttendance,
  useGroupProfile,
  useSetGroupAttendance,
} from '../../models/groups'
import {
  useBlockDebtorStudent,
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
  const [connectStudentForm] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const { mutate: connectStudentToGroup } = useConnectStudentToGroup()
  const { mutate: disconnectStudentFromGroup } = useDisconnectStudentFromGroup()
  const { mutate: saveAttendance } = useSetGroupAttendance()
  const { mutate: deleteGroup } = useDeleteGroup()
  const { mutate: blockDebtorStudent } = useBlockDebtorStudent()
  const {
    data: groupData,
    refetch,
    isLoading: isGroupProfileLoading,
  } = useGroupProfile(groupId)
  const {
    data: studentsWithoutGroup,
    isLoading: isStudentWithoutGroupLoading,
  } = useStudentsWithoutGroup()
  const {
    data: groupAttendance,
    isLoading: isGroupAttendanceLoading,
    refetch: refetchGroupAttendance,
  } = useGroupAttendance(groupId)
  const [attendanceData, setAttendanceData] = useState<number[]>([])

  const defaultAttendanceData = useMemo(() => {
    const today = dayjs().format('YYYY-MM-DD')
    const attendance =
      groupAttendance?.data?.[0] &&
      Object.values(groupAttendance.data[0])
        .flat()
        .filter(
          (item: any) =>
            dayjs(item?.attendanceDate).format('YYYY-MM-DD') === today
        )
        .map((item: any) => item?.attended && item?.student?.id)
        .filter(Boolean)

    return attendance
  }, [groupAttendance])

  useEffect(() => {
    setAttendanceData(defaultAttendanceData)
  }, [defaultAttendanceData])

  useEffect(() => {
    console.log({ attendanceData, defaultAttendanceData })
  }, [attendanceData, defaultAttendanceData])

  useEffect(() => {
    if (groupId) {
      refetch()
    }
  }, [groupId, refetch, defaultAttendanceData])

  const changeStatus = (
    newStatus: boolean,
    studentId: number,
    date: string
  ) => {
    const today = dayjs().format('YYYY-MM-DD')

    if (today === date) {
      setAttendanceData((prev: number[]) => {
        if (newStatus) {
          return [...prev, studentId]
        } else {
          return prev.filter((id) => id !== studentId)
        }
      })
    }
  }

  const renderStatus = useCallback(
    (record: Student, date: string) => {
      const attendance =
        groupAttendance?.data?.[0] &&
        Object.values(groupAttendance.data[0])
          .flat()
          .map((item: any) => ({
            id: item?.id as number,
            studentId: item?.student?.id as number,
            attendanceDate: dayjs(item?.attendanceDate) as any,
            attended: item?.attended as boolean,
          }))

      const currentStudent = attendance?.find(
        (item: any) =>
          item.studentId === parseInt(record.id) &&
          dayjs(item.attendanceDate).isSame(date, 'day')
      )

      const isToday = dayjs().isSame(dayjs(date, 'YYYY-MM-DD'), 'day')
      const isAttended = attendanceData?.includes(Number(record.id))

      return (
        <div className="w-full h-full flex justify-center items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              (isToday && isAttended) || (!isToday && currentStudent?.attended)
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            } ${isToday ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
            onClick={() => {
              if (isToday) {
                changeStatus(!isAttended, parseInt(record.id), date)
              }
            }}
          >
            {(isToday && isAttended) ||
            (!isToday && currentStudent?.attended) ? (
              <TiTick className="text-lg" />
            ) : (
              <TiTimes className="text-lg" />
            )}
          </div>
        </div>
      )
    },
    [attendanceData, groupAttendance, groupId]
  )

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

      const allowedDays = groupData.days.map(convertDaytoEnglish)

      while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
        const currentDate = current.clone()
        const weekDay = currentDate.format('dddd')
        const isEven = currentDate.date() % 2 === 0
        const isOdd = !isEven
        if (
          allowedDays.includes(weekDay) ||
          (allowedDays.includes('Even_days') && isEven) ||
          (allowedDays.includes('Odd_days') && isOdd)
        ) {
          const formattedDate = currentDate.format('YYYY-MM-DD')
          lessonsArray.push({
            title: `${currentDate.format('DD')} - ${t(`month.${convertMonth(currentDate.format('MMMM'))}`)}`,
            dataIndex: formattedDate,
            key: formattedDate,
            render: (text: any, record: Student) =>
              renderStatus(record, formattedDate),
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
    t,
  ])

  const handleSubmitAttendance = async () => {
    try {
      await saveAttendance({
        groupId: groupId ? groupId : (groupId as string),
        data: attendanceData as any,
      })

      setTimeout(async () => {
        await refetchGroupAttendance()
      }, 1000)
      message.success(t('formMessages.success'))
    } catch (error) {
      message.error('Failed to submit attendance')
    }
  }
  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      ...lessons,
      {
        title: t('actions.actions'),
        dataIndex: 'actions',
        key: 'actions',
        fixed: 'right',
        render: (student: Record<string, any>) => (
          <Popconfirm
            onConfirm={async () => {
              await blockDebtorStudent(student.id)
              setTimeout(() => refetch(), 500)
            }}
            title={t('formMessages.confirmBlock')}
          >
            <Tooltip title={t('students.block')}>
              <Button
                type="text"
                className="size-12 p-0 text-red-500 hover:!text-red-700"
              >
                <MdBlock className="text-2xl " />
              </Button>
            </Tooltip>
          </Popconfirm>
        ),
      },
    ],
    [lessons]
  )

  console.log(groupData)

  if (
    !groupData ||
    isStudentWithoutGroupLoading ||
    !groupAttendance ||
    isGroupProfileLoading ||
    isGroupAttendanceLoading
  ) {
    return <CustomLoader />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full rounded-lg bg-white p-6 shadow-md md:w-1/3">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-2xl m-0 font-semibold">
              {groupData?.groupName} - {groupData?.courseName}
            </h1>
            <div className="flex items-center space-x-2 text-[#7338ac]">
              <Link
                to="/groups"
                className={'text-xl font-bold hover:text-blue-500'}
              >
                <BsArrowReturnLeft size={25} />
              </Link>
              <Popconfirm
                title={t('formMessages.confirmDelete')}
                okText={t('crud.delete')}
                cancelText={t('form.cancel')}
                onConfirm={() => deleteGroup(groupId as string)}
              >
                <RiDeleteBin6Line size={25} className="cursor-pointer" />
              </Popconfirm>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-1xl font-semibold text-[#477082]">
              {t('groups.price')}:{' '}
            </p>
            <h2 className="text-2xl font-bold">
              {groupData.groupPrice.toLocaleString()} UZS
            </h2>
            <p className="text-1xl font-semibold text-[#477082]">
              {t('groups.days')}:{' '}
            </p>
            <h2 className="text-2xl font-bold">Juft kunlari</h2>
            <p className="text-1xl font-semibold text-[#477082]">
              {t('rooms.titleSingular')}:{' '}
            </p>
            <h2 className="text-2xl font-bold">{groupData?.room?.roomName}</h2>
            <p className="text-1xl font-semibold text-[#477082]">
              {t('groups.startTime')} :
            </p>
            <h2 className="text-2xl font-bold">{groupData?.startTime}</h2>
            <p className="text-1xl font-semibold text-[#477082]">
              {t('groups.startDate')}:
            </p>
            <h2 className="text-2xl font-bold">{groupData?.startDate}</h2>
            <p className="text-1xl font-semibold text-[#477082]">
              {t('groups.endDate')}:
            </p>
            <h2 className="text-2xl font-bold">{groupData?.endDate}</h2>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{t('groups.list')}: </h2>
              <p>{groupData?.students?.length}</p>
            </div>
            <div className="flex cursor-pointer text-blue-400 hover:text-blue-600">
              <p onClick={() => setOpen(true)}>{t('crud.add')}</p>
            </div>
            <ul className="mt-2 space-y-2">
              {groupData?.students.map((item: Student, index: number) => (
                <li key={index} className="flex  text-sm">
                  <div className="flex justify-between items-center w-full">
                    <span>
                      {item.firstname} {item.lastname}
                    </span>
                    <div className="flex justify-center items-center gap-3">
                      <span className="text-gray-500">
                        {item.phoneNumber.startsWith('+998')
                          ? item.phoneNumber
                          : `+998${item.phoneNumber}`}
                      </span>
                      <button
                        onClick={() =>
                          disconnectStudentFromGroup({
                            studentId: item.id,
                            groupId: groupId ? groupId : '',
                          })
                        }
                        className="flex gap-2 text-purple-600"
                      >
                        <RiDeleteBin6Line className="cursor-pointer" />
                      </button>
                    </div>
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
              actions: student,
            }))}
            hasActions={false}
          />
          <div className="flex mt-3 items-center justify-end">
            <MyButton
              disabled={groupData?.students?.length === 0}
              onClick={handleSubmitAttendance}
            >
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
            message.success(t('formMessages.success'))
            connectStudentForm.resetFields()
            setTimeout(() => refetch(), 500)
          } catch (e) {
            console.error(e)
            message.error('Error connecting student to group')
          }
        }}
      >
        <Form form={connectStudentForm}>
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
