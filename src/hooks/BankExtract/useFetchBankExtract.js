import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetBankExtractRequest } from 'store/modules/BankExtract/action'

export default function useFetchBankExtract(filterData) {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(GetBankExtractRequest(filterData, auth.cpf))
  }, [dispatch, filterData, auth.cpf])
}

useFetchBankExtract.defaultProps = {
  filterData: {
    filter: 0,
    startDate: '',
    endDate: '',
  },
}
