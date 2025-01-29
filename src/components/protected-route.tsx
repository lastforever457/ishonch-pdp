import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { TRole, useAuth } from '../providers/auth-context-provider'

const ProtectedRoute = ({
  roles,
  children,
}: {
  roles: TRole[]
  children: ReactNode
}) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  } else if (!roles.includes(user.role)) {
    return <Navigate to="/403" />
  } else {
    return children
  }
}

export default ProtectedRoute
