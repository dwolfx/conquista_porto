import React from 'react'
import Button from 'components/Button'
import Text from 'components/Text'
// import IconExporter from 'components/IconExporter'

import { CardInfo, Title, WrapperError } from '../styles'
import { useDispatch } from 'react-redux'
import { GetCreditCardDataRequest } from 'store/modules/CreditCard/action'

interface CreditCardError {
  title: string
  msgError: string
  buttonText: string
}

const CardInfoItem = ({ title, msgError, buttonText }: CreditCardError) => {
  const dispatch = useDispatch()

  const onError = () => {
    dispatch(GetCreditCardDataRequest())
  }

  return (
    <CardInfo>
      <Title>
        <Text type="headline">{title}</Text>
      </Title>
      <WrapperError>
        <Text type="captionUppercase" color="magenta2" bold>
          {msgError}
        </Text>
      </WrapperError>
      <Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-subname="Cartao de credito"
        data-gtm-name="botao cartao de credito error"
        color="primary"
        onClick={onError}
      >
        {buttonText}
      </Button>
    </CardInfo>
  )
}

export default CardInfoItem
