import React, { useContext } from 'react'
import BaseFormStep from '../BaseFormStep'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import { ThemeContext } from 'styled-components/macro'

import { Container, WrapperText, Controls, ButtonsCtrls } from './styles'

type TSuccessOrError = 'SUCCESS' | 'ERROR'
type TTextMessage = 'SUCCESS' | 'SUCCESS_FUND_CLOSED' | 'ERROR'

interface ISuccessError {
  successOrError: TSuccessOrError
  textMessage: TTextMessage
  days: string
  onHandleHomePage: () => void
  onHandleManagerPage: () => void
}

const SuccessError = ({
  successOrError,
  textMessage,
  days,
  onHandleHomePage,
  onHandleManagerPage,
}: ISuccessError) => {
  const themeContext = useContext(ThemeContext)

  const getTitleMessage = (titleMessage: TSuccessOrError) => {
    const objTypeTitle = {
      SUCCESS: 'Solicitação de resgate recebida com sucesso.',
      ERROR: 'Não foi possível confirmar sua solicitação.',
    }
    return objTypeTitle[titleMessage]
  }

  const getTextMessage = (textMessage: TTextMessage, days: string) => {
    const objTypeText = {
      SUCCESS: `Em ${days} dias, o dinheiro estará disponível na sua conta de investimento.`,
      SUCCESS_FUND_CLOSED: `Como já passamos do horário de movimentação do fundo, o prazo para o dinheiro ficar na sua conta é de ${days} dias.`,
      ERROR: 'Tente novamente mais tarde por favor.',
    }
    return objTypeText[textMessage]
  }

  const bodyComponent = () => (
    <Container>
      <Icon
        width="28"
        fill={
          successOrError === 'SUCCESS'
            ? themeContext.colors.green3
            : themeContext.colors.magenta2
        }
        name={successOrError === 'SUCCESS' ? 'check' : 'closerounded'}
      />
      <WrapperText>
        <Text type="headline" color="gray6" bold>
          {getTitleMessage(successOrError)}
        </Text>
        <Text type="body" color="gray5">
          {getTextMessage(textMessage, days)}
        </Text>
      </WrapperText>
    </Container>
  )

  const footerComponent = () => (
    <Controls>
      <ButtonsCtrls
        data-gtm-subname="resgate de fundo"
        data-gtm-name="tela de resgate erro sucesso"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        outline
        color="primary"
        onClick={onHandleHomePage}
      >
        página inicial
      </ButtonsCtrls>
      <ButtonsCtrls
        data-gtm-subname="resgate de fundo"
        data-gtm-name="tela de resgate erro sucesso"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        color="primary"
        onClick={onHandleManagerPage}
      >
        gerenciar investimentos
      </ButtonsCtrls>
    </Controls>
  )

  return (
    <BaseFormStep
      onChangeFundDetailOpen={() => {}}
      cardBody={bodyComponent()}
      cardFooter={footerComponent()}
    />
  )
}

export default SuccessError
