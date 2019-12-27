import { useEffect } from 'react'

import { GetDataRequest } from 'store/modules/ConsortiumVehicle/action'
import { useDispatch } from 'react-redux'

export default function useFetchConsortiumVehicle() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetDataRequest())
  }, [dispatch])
}
