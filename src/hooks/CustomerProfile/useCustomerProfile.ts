import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCustomerProfileRequest } from 'store/modules/CustomerProfile/action'

export function useCustomerProfile() {
  const dispatch = useDispatch()
  const data = useSelector((state: any) => state.CustomerProfile)
  const auth = useSelector((state: any) => state.auth)

  useEffect(() => {
    if (!data) {
      dispatch(GetCustomerProfileRequest(auth.cpf))
    }
  }, [auth, data, dispatch])
}
