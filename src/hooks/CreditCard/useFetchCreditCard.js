import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetCreditCardDataRequest } from 'store/modules/CreditCard/action'

export default function useFetchCreditCard() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.creditCard.data)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!data) {
      dispatch(GetCreditCardDataRequest(auth.cpf, auth.accessToken))
    }
  }, [dispatch, data])
}
