import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { GetSuitabilityRequestAndRedirect } from 'store/modules/Suitability/action'

export default function useSuitability({ errorPath }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { suitability, cpf, isLoading } = useSelector(state => ({
    suitability: state.suitability.data,
    isLoading: state.suitability.isLoading,
    cpf: state.auth.cpf,
  }))

  useEffect(() => {
    if (!suitability) {
      dispatch(GetSuitabilityRequestAndRedirect({ cpf, history, errorPath }))
    }
  }, [suitability, dispatch, cpf, history, errorPath])

  return { suitability, isLoading }
}

useSuitability.propTypes = {
  errorPath: PropTypes.string,
}

useSuitability.defaultProps = {
  errorPath: '/',
}
