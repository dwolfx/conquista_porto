import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetPositionDataRequest } from 'store/modules/Investment/Position/action'

export default function useFetchPosition() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.investmentPosition.data)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!data) {
      dispatch(GetPositionDataRequest(auth.cpf, auth.accessToken))
    }
  }, [dispatch, data, auth])
}
