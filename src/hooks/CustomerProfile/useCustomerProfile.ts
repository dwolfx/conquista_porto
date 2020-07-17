import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCustomerProfileRequest } from 'store/modules/CustomerProfile/action'

export function useCustomerProfile() {
  const dispatch = useDispatch()
  const data = useSelector((state: any) => state.CustomerProfile)

  useEffect(() => {
    if (!data) {
      dispatch(GetCustomerProfileRequest())
    }
  }, [data, dispatch])
}
