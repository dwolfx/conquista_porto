import React from 'react'
import { useHistory } from 'react-router-dom'
import useMedia from 'hooks/useMedia'

import { IProps } from '../styles'

import * as s from '../styles'
import Divisor from 'components/Divisor'
import Text from 'components/Text'
import { FlexTextWrapper } from '../../styles'

const ErrorCard = ({ onCloseLayer, handleCloseButton }: IProps) => {
  const history = useHistory()
  const isMobile = useMedia('sm')

  const cardFooter = (
    <s.ButtonsWrapper>
      <s.Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        outline
        data-gtm-name="gerenciar investimentos"
        onClick={() => {
          history.location.pathname === '/investimentos/visualizar'
            ? handleCloseButton()
            : history.push('/investimentos/visualizar')
        }}
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
    <>
      <s.Card footer={!isMobile && cardFooter}>
        <s.ContentWrapper>
          <s.TitleWrapper>
            <s.Icon name="closerounded" color="magenta2" />
            <s.Title>Não foi possível confirmar sua solicitação.</s.Title>
          </s.TitleWrapper>
          <s.InfoTextError>
            Tente novamente mais tarde, por favor.
          </s.InfoTextError>
          {isMobile && (
            <>
              <Divisor />
              <FlexTextWrapper>
                <Text bold color="gray5">
                  Solicitações enviadas após às 15h serão processadas no próximo
                  dia útil.
                </Text>
              </FlexTextWrapper>
            </>
          )}
        </s.ContentWrapper>
      </s.Card>
      {isMobile && <s.FixedBottom>{cardFooter}</s.FixedBottom>}
    </>
  )
}

export default ErrorCard
