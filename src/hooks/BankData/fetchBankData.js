import { useEffect } from 'react'

import { GetBankDataRequest } from 'store/modules/BankData/action'
import { useDispatch } from 'react-redux'

export default function useFetchBankData() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetBankDataRequest())
  }, [dispatch])
}
