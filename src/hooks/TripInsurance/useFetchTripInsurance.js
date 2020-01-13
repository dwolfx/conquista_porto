import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetTripInsuranceDataRequest } from 'store/modules/TripInsurance/action'

export default function useFetchTripInsurance() {
  const dispatch = useDispatch()
  const status = useSelector(state => state.tripInsurance.status)

  useEffect(() => {
    if (!status) {
      dispatch(GetTripInsuranceDataRequest())
    }
  }, [dispatch, status])
}
