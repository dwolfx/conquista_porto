import { useEffect } from 'react'

import { GetConsortiumBuildingDataRequest } from 'store/modules/ConsortiumBuilding/action'
import { useDispatch } from 'react-redux'

export default function useFetchConsortiumBuilding() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetConsortiumBuildingDataRequest())
  }, [dispatch])
}
