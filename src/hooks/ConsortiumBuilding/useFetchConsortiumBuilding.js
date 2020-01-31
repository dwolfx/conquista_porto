import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetConsortiumBuildingDataRequest } from 'store/modules/ConsortiumBuilding/action'

export default function useFetchConsortiumBuilding() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.consortiumBuilding.data)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!data) {
      dispatch(GetConsortiumBuildingDataRequest(auth.cpf))
    }
  }, [dispatch, data, auth])
}
