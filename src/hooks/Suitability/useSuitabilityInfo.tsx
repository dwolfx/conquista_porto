import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetSuitabilityInfoRequest } from 'store/modules/SuitabilityInfo/action'

const useFetchSuitabilityInfo = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector((state: any) => ({
    auth: state.auth,
  }))

  useEffect(() => {
    if (auth.cpf) {
      dispatch(GetSuitabilityInfoRequest(auth.cpf))
    }
  }, [auth.cpf, dispatch])
}

export default useFetchSuitabilityInfo