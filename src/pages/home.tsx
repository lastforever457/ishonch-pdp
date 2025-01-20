import { Col, Row } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useGroups } from '../models/groups'
import { useStudents } from '../models/students'
import { useUsers } from '../models/users'

const Home = () => {
  const { t } = useTranslation()
  const { data: teachers, isLoading: isTeachersLoading } = useUsers('TEACHER')
  const { data: students, isLoading: isStudentsLoading } = useStudents()
  const { data: groups, isLoading: isGroupsLoading } = useGroups('ACTIVE')

  const users = useMemo(
    () => [
      {
        id: 1,
        img: '/images/user-1.svg',
        percent: teachers?.data?.length,
        title: t('home.employees'),
      },
      {
        id: 2,
        img: '/images/user-2.svg',
        percent: students?.data?.length,
        title: t('home.active-students'),
      },
      {
        id: 3,
        img: '/images/user-3.svg',
        percent: groups?.data?.length,
        title: t('home.groups'),
      },
      {
        id: 4,
        img: '/images/user-4.svg',
        percent: '56',
        title: t('home.debtors'),
      },
      {
        id: 5,
        img: '/images/user-5.svg',
        percent: '246',
        title: t('home.pay-month'),
      },
      {
        id: 6,
        img: '/images/user-6.svg',
        percent: '24',
        title: t('home.left-group'),
      },
    ],
    [t, teachers, students, groups]
  )

  if (isTeachersLoading || isStudentsLoading || isGroupsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <Row gutter={[16, 16]} className="md:px-10 py-4 text-sm">
        {users.map((user) => (
          <Col key={user.id} xs={24} sm={12} md={8} lg={8} xl={8} xxl={4}>
            <div className="flex flex-col bg-primary-blue shadow-md p-4 rounded-xl h-full text-center text-sm">
              <img
                src={user.img}
                alt={user.title}
                className="flex justify-center items-center mx-auto mb-2 w-12 h-12"
              />
              <div>
                <p className="font-bold text-white">{user.title}</p>
                <p className="font-semibold text-lg text-white">
                  {user.percent}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>{' '}
    </div>
  )
}

export default Home
