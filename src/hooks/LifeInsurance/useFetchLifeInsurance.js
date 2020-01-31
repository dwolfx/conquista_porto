import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetLifeInsuranceDataRequest } from 'store/modules/LifeInsurance/action'

export default function useFetchLifeInsurance() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.lifeInsurance.data)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!data) {
      dispatch(GetLifeInsuranceDataRequest(auth.cpf))
    }
  }, [dispatch, data, auth])
}
