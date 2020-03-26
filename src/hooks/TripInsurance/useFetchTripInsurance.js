import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetTripInsuranceDataRequest } from 'store/modules/TripInsurance/action'

export default function useFetchTripInsurance() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.tripInsurance.data)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!data) {
      dispatch(GetTripInsuranceDataRequest(auth.cpf))
    }
  }, [dispatch, data, auth])
}
