import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetLifeInsuranceDataRequest } from 'store/modules/LifeInsurance/action'

export default function useFetchLifeInsurance() {
  const dispatch = useDispatch()
  const status = useSelector(state => state.lifeInsurance.status)

  useEffect(() => {
    if (!status) {
      dispatch(GetLifeInsuranceDataRequest())
    }
  }, [dispatch, status])
}
