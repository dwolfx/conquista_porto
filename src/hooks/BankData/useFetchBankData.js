import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetBankDataRequest } from 'store/modules/BankData/action'

export default function useFetchBankData() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.bankData.data)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!data) {
      dispatch(GetBankDataRequest(auth.cpf))
    }
  }, [auth, data, dispatch])
}
