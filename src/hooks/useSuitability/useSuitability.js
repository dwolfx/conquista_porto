import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { GetSuitabilityRequestAndRedirect } from 'store/modules/Suitability/action'

export default function useSuitability() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { suitability, cpf, isLoading } = useSelector(state => ({
    suitability: state.suitability.data,
    isLoading: state.suitability.isLoading,
    cpf: state.auth.cpf,
  }))

  useEffect(() => {
    if (!suitability) {
      dispatch(GetSuitabilityRequestAndRedirect({ cpf, history }))
    }
  }, [suitability, dispatch, cpf, history])

  return { suitability, isLoading }
}
