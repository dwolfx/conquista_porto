import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetInvestmentListRequest } from 'store/modules/Investment/action'

export default function useFetchInvestmentsList() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(GetInvestmentListRequest(auth.accessToken))
  }, [dispatch, auth])
}
