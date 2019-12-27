import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GetDataRequest } from 'store/modules/Investment/action'

export default function useFetchInvestmentsList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetDataRequest())
  }, [dispatch])
}
