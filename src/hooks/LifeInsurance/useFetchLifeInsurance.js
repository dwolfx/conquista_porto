import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GetDataRequest } from 'store/modules/LifeInsurance/action'

export default function useFetchLifeInsurance() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetDataRequest())
  }, [dispatch])
}
