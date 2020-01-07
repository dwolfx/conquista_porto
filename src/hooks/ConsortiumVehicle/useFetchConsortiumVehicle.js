import { useEffect } from 'react'

import { GetConsortiumVehicleDataRequest } from 'store/modules/ConsortiumVehicle/action'
import { useDispatch, useSelector } from 'react-redux'

export default function useFetchConsortiumVehicle() {
  const dispatch = useDispatch()
  const status = useSelector(state => state.consortiumVehicle.status)

  useEffect(() => {
    if (!status) {
      dispatch(GetConsortiumVehicleDataRequest())
    }
  }, [dispatch, status])
}
