import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GetSuitabilityInfoRequest } from 'store/modules/SuitabilityInfo/action'

const useFetchSuitabilityInfo = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetSuitabilityInfoRequest())
  }, [dispatch])
}

export default useFetchSuitabilityInfo
