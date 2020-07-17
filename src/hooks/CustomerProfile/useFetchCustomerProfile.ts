import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCustomerProfileRequest } from 'store/modules/CustomerProfile/action'

export default function useFetchCustomerProfile() {
  const dispatch = useDispatch()
  const { customerProfile } = useSelector<any, any>(state => ({
    customerProfile: state.customerProfile,
  }))

  useEffect(() => {
    if (!customerProfile.data) {
      dispatch(GetCustomerProfileRequest())
    }
  }, [dispatch, customerProfile.data])
}
