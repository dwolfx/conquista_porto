import React from 'react'

import { useDispatch } from 'react-redux'

import Button from 'components/Button'
import { GetPrivateWelfareRequest } from 'store/modules/PrivateWelfare/action'

import { ErrorText, ErrorWrapper } from './styles'

interface IProps {
  isLoading: boolean
}
const PrivateWelfareErrorState = ({ isLoading }: IProps) => {
  const dispatch = useDispatch()
  return (
    <ErrorWrapper>
      <ErrorText>
        Desculpe, não foi possível carregar suas informações. Aguarde alguns
        instantes e tente novamente.
      </ErrorText>

      <Button
        data-gtm-subname="home consolidada, dados de previdencia privada"
        data-gtm-name="tentar novamente"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        color="primary"
        loading={isLoading}
        onClick={() => dispatch(GetPrivateWelfareRequest())}
      >
        tentar novamente
      </Button>
    </ErrorWrapper>
  )
}

export default PrivateWelfareErrorState
