import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCustomerProfileRequest } from 'store/modules/CustomerProfile/action'

export default function useFetchCustomerProfile() {
  const dispatch = useDispatch()
  const { customerProfile, cpf } = useSelector<any, any>(state => ({
    customerProfile: state.customerProfile,
    cpf: state.auth.cpf,
  }))

  useEffect(() => {
    if (!customerProfile.data) {
      dispatch(GetCustomerProfileRequest(cpf))
    }
  }, [dispatch, customerProfile.data, cpf])
}
