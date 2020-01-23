import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GetBankDataRequest } from 'store/modules/BankData/action'

export default function useFetchBankData() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetBankDataRequest())
  }, [dispatch])
}
