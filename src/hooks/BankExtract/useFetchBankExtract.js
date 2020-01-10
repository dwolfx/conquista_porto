import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GetDataRequest } from 'store/modules/BankExtract/action'

export default function useFetchBankExtract(filterData) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetDataRequest(filterData))
  }, [dispatch, filterData])
}

useFetchBankExtract.defaultProps = {
  filterData: {
    filter: 0,
    startDate: '',
    endDate: '',
  },
}
