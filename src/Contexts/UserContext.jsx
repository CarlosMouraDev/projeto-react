import { createContext, useState } from "react"
import { TOKEN_POST, USER_GET } from "../Api/api"

export const UserContext = createContext()

export function UserStorage({children}) {
  const [data, setData] = useState(null)
  const [login, setLogin] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function getUser(token) {
    const { url, options } = USER_GET(token)
    const res = await fetch(url, options)
    const json = await res.json()
    setData(json)
    setLogin(true)
  }

  async function userLogin(username, password) {
    const { url, options } = TOKEN_POST({username, password})
    const tokenRes = await fetch(url, options)
    const {token} = await tokenRes.json()
    window.localStorage.setItem('token', token)
    getUser(token)
  }

  return (
    <UserContext.Provider value={{userLogin, data}}>
      {children}
    </UserContext.Provider>
  )
} 