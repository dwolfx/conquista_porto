import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GetBankExtractRequest } from 'store/modules/BankExtract/action'

export default function useFetchBankExtract(filterData) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetBankExtractRequest(filterData))
  }, [dispatch, filterData])
}

useFetchBankExtract.defaultProps = {
  filterData: {
    filter: 0,
    startDate: '',
    endDate: '',
  },
}
