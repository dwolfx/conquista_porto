import { useEffect } from 'react'

import { GetCreditCardDataRequest } from 'store/modules/CreditCard/action'
import { useDispatch } from 'react-redux'

export default function useFetchCreditCard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetCreditCardDataRequest())
  }, [dispatch])
}
