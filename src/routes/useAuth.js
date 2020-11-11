// import useFetchAuth from 'hooks/Auth'
import { useSelector } from 'react-redux'

export default function useAuth() {
  const authData = useSelector(state => state.auth)
  return authData.accessToken
}
