import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

export type TRole = 'ADMIN' | 'TEACHER'

interface IUser {
  id: string
  role: TRole
}

interface AuthContextType {
  user: IUser | null
  setUser: Dispatch<SetStateAction<IUser | null>>
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<IUser | null>(null)

  const login = async (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setUser({ id: '1', role: 'ADMIN' })
    } else if (username === 't' && password === 't') {
      setUser({ id: '2', role: 'TEACHER' })
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
