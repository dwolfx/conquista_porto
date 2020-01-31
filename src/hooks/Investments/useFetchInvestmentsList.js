import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GetInvestmentListRequest } from 'store/modules/Investment/action'

export default function useFetchInvestmentsList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetInvestmentListRequest())
  }, [dispatch])
}
