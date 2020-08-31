import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

const useFetchFundDetails = () => {
  const dispatch = useDispatch()
  const { idFund } = useSelector((state: any) => ({
    idFund: state.investmentPosition.idFund
  }))

  useEffect(() => {
    if (idFund) {
      dispatch(GetInvestmentDetailsRequest(idFund))
    }
  }, [idFund, dispatch])
}

export default useFetchFundDetails