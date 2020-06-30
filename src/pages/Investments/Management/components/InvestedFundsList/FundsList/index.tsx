import React from 'react'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import { formatMoney } from 'helpers'

import {
  CardStyled,
  ButtonStyled,
  FundItem,
  HorizontalListStyled,
} from './styles'

interface IProps {
  filteredFunds: any[]
  idFund: string
  displayInformation: boolean
  onHandleChangeIdFund: (idFund: string) => void
}
const FundsList = ({
  filteredFunds,
  idFund,
  displayInformation,
  onHandleChangeIdFund,
}: IProps) => {
  const history = useHistory()
  return (
    <CardStyled
      footer={
        <ButtonStyled
          color="primary"
          data-testid="button-add-fund"
          onClick={() => history.push('/investimentos/lista-fundos')}
        >
          Adicionar fundo
        </ButtonStyled>
      }
    >
      {filteredFunds.map((fund: any) => (
        <FundItem
          key={`fund-${fund.id_carteira}`}
          data-testid="fund-list-item"
          selected={idFund === fund.id_carteira}
          itemsLength={filteredFunds.length}
          onClick={() => onHandleChangeIdFund(fund.id_carteira)}
        >
          <HorizontalListStyled
            startItems={[
              <VerticalList
                elements={[
                  <Text type="captionUppercase" bold color="gray6">
                    {fund.categoria_arena === 'Renda Variável'
                      ? 'Ações'
                      : fund.categoria_arena}
                  </Text>,
                  <Text
                    type="body"
                    bold
                    color={idFund === fund.id_carteira ? 'blue4' : 'gray5'}
                  >
                    {fund.apelido}
                  </Text>,
                ]}
              />,
            ]}
            endItems={[
              <Text
                type="body"
                bold
                color={idFund === fund.id_carteira ? 'gray6' : 'gray5'}
                css={`
                  -webkit-text-security: ${displayInformation
                    ? 'disc'
                    : 'none'};
                `}
              >
                {formatMoney(fund.saldo_atual)}
              </Text>,
            ]}
          />
        </FundItem>
      ))}
    </CardStyled>
  )
}

export default FundsList
