import { useEffect } from 'react'

import { GetDataRequest } from 'store/modules/CreditCard/action'
import { useDispatch } from 'react-redux'

export default function useFetchApiHook() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetDataRequest())
  }, [dispatch])
}
