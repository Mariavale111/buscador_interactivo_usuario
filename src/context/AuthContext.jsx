import { createContext, useContext, useState } from 'react'
 
import { useNavigate } from 'react-router-dom'
 
const AuthContext = createContext()
 
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
 
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      setUser({ username })
      navigate('/usuarios')
    } else {
      alert('Invalid credentials')
    }
  }
 
  const logout = () => {
    setUser(null)
    navigate('/login')
  }
 
  // la funcion retorna el contexto de autenticacion
 
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
 
export function useAuth() {
  return useContext(AuthContext)
}