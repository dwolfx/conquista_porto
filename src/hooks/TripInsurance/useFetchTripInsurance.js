import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GetDataRequest } from 'store/modules/TripInsurance/action'

export default function useFetchTripInsurance() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetDataRequest())
  }, [dispatch])
}
