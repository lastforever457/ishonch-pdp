import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './components/protected-route.tsx'
import MainLayout from './layouts/layout'
import EmployeeId from './pages/employees/employee-id/employee-id.tsx'
import Employees from './pages/employees/employees.tsx'
import Finance from './pages/finance/finance.tsx'
import Attendance from './pages/group/attendance.tsx'
import Groups from './pages/group/groups.tsx'
import Home from './pages/home.tsx'
import Login from './pages/login.tsx'
import Rooms from './pages/rooms.tsx'
import Settings from './pages/settings.tsx'
import Students from './pages/students.tsx'
import Unauthorized from './pages/unauthorized.tsx'
import { SidebarProvider } from './providers/sidebar-context-provider.tsx'

const App = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute roles={['ADMIN', 'TEACHER']}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: 'groups',
          element: (
            <ProtectedRoute roles={['ADMIN', 'TEACHER']}>
              <Groups />
            </ProtectedRoute>
          ),
        },
        {
          path: 'groups/:groupId',
          element: (
            <ProtectedRoute roles={['ADMIN', 'TEACHER']}>
              <Attendance />
            </ProtectedRoute>
          ),
        },
        {
          path: 'employees',
          element: (
            <ProtectedRoute roles={['ADMIN']}>
              <Employees />
            </ProtectedRoute>
          ),
        },
        {
          path: 'employees/:id',
          element: (
            <ProtectedRoute roles={['ADMIN']}>
              <EmployeeId />
            </ProtectedRoute>
          ),
        },
        {
          path: 'rooms',
          element: (
            <ProtectedRoute roles={['ADMIN']}>
              <Rooms />
            </ProtectedRoute>
          ),
        },
        {
          path: 'students',
          element: (
            <ProtectedRoute roles={['ADMIN']}>
              <Students />
            </ProtectedRoute>
          ),
        },
        {
          path: 'finance',
          element: (
            <ProtectedRoute roles={['ADMIN']}>
              <Finance />
            </ProtectedRoute>
          ),
        },
        {
          path: 'settings',
          element: <Settings />,
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '*',
      element: <div>404</div>,
    },
    {
      path: '403',
      element: <Unauthorized />,
    },
  ])

  return (
    <SidebarProvider>
      <RouterProvider router={routes} />
    </SidebarProvider>
  )
}

export default App
