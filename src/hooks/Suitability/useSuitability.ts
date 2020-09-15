import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { GetSuitabilityRequestAndRedirect } from 'store/modules/Suitability/action'

interface IProps {
  errorPath?: string
  goalType?: string
}

export default function useSuitability({ errorPath, goalType }: IProps) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { suitability, cpf, isLoading } = useSelector<any, any>(state => ({
    suitability: state.suitability.data,
    isLoading: state.suitability.isLoading,
    cpf: state.auth.cpf,
  }))

  useEffect(() => {
    if (!(suitability && Object.entries(suitability).length)) {
      dispatch(
        GetSuitabilityRequestAndRedirect({ cpf, history, errorPath, goalType })
      )
    }
  }, [suitability, dispatch, cpf, history, errorPath, goalType, addToast])

  return { suitability, isLoading }
}

useSuitability.propTypes = {
  errorPath: PropTypes.string,
}

useSuitability.defaultProps = {
  errorPath: '/',
}
