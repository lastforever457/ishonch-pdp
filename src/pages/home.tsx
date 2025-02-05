import { Col, Row } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { CustomLoader } from '../components/loader'
import { useLocationParams } from '../hooks/use-location-params'
import { useDashboard } from '../models/dashboard'

export interface IDashboard {
  id: number
  img: string
  percent: number
  title: string
  link: string
}

const Home = () => {
  const { t } = useTranslation()
  const { query } = useLocationParams()
  const { data, isLoading } = useDashboard()

  const users: IDashboard[] = useMemo(
    () => [
      {
        id: 1,
        img: '/images/user-1.svg',
        percent: data?.staffs,
        title: t('home.employees'),
        link: '/employees',
      },
      {
        id: 2,
        img: '/images/user-2.svg',
        percent: data?.active_students,
        title: t('home.active-students'),
        link: '/students',
      },
      {
        id: 3,
        img: '/images/user-3.svg',
        percent: data?.groups,
        title: t('home.groups'),
        link: '/groups',
      },
      {
        id: 4,
        img: '/images/user-4.svg',
        percent: '56',
        title: t('home.debtors'),
        link: '/finance',
      },
      {
        id: 5,
        img: '/images/user-5.svg',
        percent: '246',
        title: t('home.pay-month'),
        link: '/finance',
      },
      {
        id: 6,
        img: '/images/user-6.svg',
        percent: data?.actively_left_students,
        title: t('home.left-group'),
        link: '/groups',
      },
    ],
    [t, data]
  )

  if (isLoading) return <CustomLoader />

  return (
    <div>
      <Row gutter={[16, 16]} className="py-4 text-sm md:px-10">
        {query.search
          ? users
              .filter((user) =>
                user.title
                  .toLowerCase()
                  .includes((query.search as string).toString().toLowerCase())
              )
              .map((user: IDashboard) => {
                return (
                  <Col
                    key={user.id}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={8}
                    xl={8}
                    xxl={4}
                  >
                    <Link to={user.link}>
                      <div className="bg-primary-blue flex h-full flex-col rounded-xl p-4 text-center text-sm shadow-md">
                        <img
                          src={user.img}
                          alt={user.title}
                          className="mx-auto mb-2 flex h-12 w-12 items-center justify-center"
                        />
                        <div>
                          <p className="font-bold text-white">{user.title}</p>
                          <p className="text-lg font-semibold text-white">
                            {user.percent}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Col>
                )
              })
          : users.map((user: IDashboard) => {
              return (
                <Col key={user.id} xs={24} sm={12} md={8} lg={8} xl={8} xxl={4}>
                  <Link to={user.link}>
                    <div className="bg-primary-blue flex h-full flex-col rounded-xl p-4 text-center text-sm shadow-md">
                      <img
                        src={user.img}
                        alt={user.title}
                        className="mx-auto mb-2 flex h-12 w-12 items-center justify-center"
                      />
                      <div>
                        <p className="font-bold text-white">{user.title}</p>
                        <p className="text-lg font-semibold text-white">
                          {user.percent}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Col>
              )
            })}
      </Row>{' '}
    </div>
  )
}

export default Home
