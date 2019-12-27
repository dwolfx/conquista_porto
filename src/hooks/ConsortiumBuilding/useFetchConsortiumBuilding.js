import { useEffect } from 'react'

import { GetDataRequest } from 'store/modules/ConsortiumBuilding/action'
import { useDispatch } from 'react-redux'

export default function useFetchConsortiumBuilding() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetDataRequest())
  }, [dispatch])
}
