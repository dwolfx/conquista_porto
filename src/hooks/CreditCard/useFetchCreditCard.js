import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetCreditCardDataRequest } from 'store/modules/CreditCard/action'

export default function useFetchCreditCard() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.creditCard.data)

  useEffect(() => {
    if (!data) {
      dispatch(GetCreditCardDataRequest())
    }
  }, [dispatch, data])
}
