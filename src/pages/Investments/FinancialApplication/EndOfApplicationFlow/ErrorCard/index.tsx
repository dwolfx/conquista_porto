import React from 'react'
import { useHistory } from 'react-router-dom'

import { IProps } from '../styles'

import * as s from '../styles'

const ErrorCard = ({ onCloseLayer }: IProps) => {
  const history = useHistory()

  const cardFooter = (
    <s.ButtonsWrapper>
      <s.Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        outline
        data-gtm-name="gerenciar investimentos"
        onClick={() => history.push('/investimentos/visualizar')}
      >
        Gerenciar Investimentos
      </s.Button>
      <s.Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-name="lista de fundos"
        onClick={() => onCloseLayer()}
      >
        Lista de Fundos
      </s.Button>
    </s.ButtonsWrapper>
  )
  return (
    <s.Card footer={cardFooter}>
      <s.ContentWrapper>
        <s.TitleWrapper>
          <s.Icon name="closerounded" color="magenta2" />
          <s.Title>Não foi possível confirmar sua solicitação.</s.Title>
        </s.TitleWrapper>
        <s.InfoTextError>
          Tente novamente mais tarde, por favor.
        </s.InfoTextError>
      </s.ContentWrapper>
    </s.Card>
  )
}

export default ErrorCard
