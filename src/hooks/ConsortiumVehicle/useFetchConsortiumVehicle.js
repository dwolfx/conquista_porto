import { useEffect } from 'react'

import { GetConsortiumVehicleDataRequest } from 'store/modules/ConsortiumVehicle/action'
import { useDispatch, useSelector } from 'react-redux'

export default function useFetchConsortiumVehicle() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.consortiumVehicle.data)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!data) {
      dispatch(GetConsortiumVehicleDataRequest(auth.cpf))
    }
  }, [dispatch, data, auth])
}
