import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { GetVehicleFinancingDataRequest } from 'store/modules/VehicleFinancing/action'

export default function useFetchVehicleFinancing() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.vehicleFinancing.data)

  useEffect(() => {
    if (!data) {
      dispatch(GetVehicleFinancingDataRequest())
    }
  }, [dispatch, data])
}
