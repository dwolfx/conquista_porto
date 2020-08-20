import React from 'react'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import InvestmentEmptyImg from 'assets/images/pages/Home/img_investiments_empty.jpg'
import Text from 'components/Text'

import * as s from './styles'

const InvestmentEmptyStateCard: React.FC = ({ ...rest }) => {
  const history = useHistory()

  return (
    <s.Card headerIcon="financial" headerTitle="Investimentos" {...rest}>
      <s.ContentWrapper>
        <s.ImageWrapper>
          <img src={InvestmentEmptyImg} alt="home offer pic" />
          <s.Caption>
            <Text type="button" color="white" bold>
              Fundos de Investimento
            </Text>
          </s.Caption>
        </s.ImageWrapper>
        <s.TextWrapper>
          <Text
            type="title"
            bold
            color="gray6"
            css={`
              padding-bottom: 7px;
            `}
          >
            Diversificar com menos riscos
          </Text>
          <Text
            type="body"
            bold
            color="gray5"
            css={`
              padding-bottom: 14px;
            `}
          >
            Uma carteira de investimento com diferentes ativos é a chave para
            bons rendimentos. Na Lista de Fundos, você pode selecionar os que
            mais combinam com o seu perfil.
          </Text>
          <s.Button
            data-gtm-subname="card investimentos diversificar com menos riscos"
            data-gtm-name="conhecer"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            color="secondary"
            onClick={() => history.push('/investimentos')}
          >
            conhecer
          </s.Button>
        </s.TextWrapper>
      </s.ContentWrapper>
    </s.Card>
  )
}

export default InvestmentEmptyStateCard
