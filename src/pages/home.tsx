import { Col, Row } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Loader } from '../components/loader'
import { useDashboard } from '../models/dashboard'
import { TRole, useAuth } from '../providers/auth-context-provider'

export interface IDashboard {
  id: number
  img: string
  percent: number
  title: string
  link: string
  role: TRole[]
}

const Home = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useDashboard()
  const { user: currentUser } = useAuth()

  const users: IDashboard[] = useMemo(
    () => [
      {
        id: 1,
        img: '/images/user-1.svg',
        percent: data?.staffs,
        title: t('home.employees'),
        link: '/employees',
        role: ['ADMIN'],
      },
      {
        id: 2,
        img: '/images/user-2.svg',
        percent: data?.active_students,
        title: t('home.active-students'),
        link: '/students',
        role: ['ADMIN', 'TEACHER'],
      },
      {
        id: 3,
        img: '/images/user-3.svg',
        percent: data?.groups,
        title: t('home.groups'),
        link: '/groups',
        role: ['ADMIN', 'TEACHER'],
      },
      {
        id: 4,
        img: '/images/user-4.svg',
        percent: '56',
        title: t('home.debtors'),
        link: '/finance',
        role: ['ADMIN'],
      },
      {
        id: 5,
        img: '/images/user-5.svg',
        percent: '246',
        title: t('home.pay-month'),
        link: '/finance',
        role: ['ADMIN'],
      },
      {
        id: 6,
        img: '/images/user-6.svg',
        percent: data?.actively_left_students,
        title: t('home.left-group'),
        link: '/groups',
        role: ['ADMIN', 'TEACHER'],
      },
    ],
    [t, data]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <Row gutter={[16, 16]} className="md:px-10 py-4 text-sm">
        {users.map((user: IDashboard) => {
          if (user.role.includes(currentUser?.role as TRole)) {
            return (
              <Col key={user.id} xs={24} sm={12} md={8} lg={8} xl={8} xxl={4}>
                <Link to={user.link}>
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
                </Link>
              </Col>
            )
          }
        })}
      </Row>{' '}
    </div>
  )
}

export default Home
