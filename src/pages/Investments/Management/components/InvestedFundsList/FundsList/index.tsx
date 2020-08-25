import React from 'react'
import { useHistory } from 'react-router-dom'
import { uuid } from 'uuidv4'
import 'styled-components/macro'

import VerticalList from 'components/VerticalList'
import Text from 'components/Text'

import {
  CardStyled,
  ButtonStyled,
  FundItem,
  HorizontalListStyled,
} from './styles'

interface IProps {
  filteredFunds: any[]
  idFund: number
  displayInformation: boolean
  onHandleChangeIdFund: (idFund: number) => void
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
          key={uuid()}
          data-testid="fund-list-item"
          selected={idFund === fund.id}
          itemsLength={filteredFunds.length}
          onClick={() => onHandleChangeIdFund(fund.id)}
        >
          <HorizontalListStyled
            startItems={[
              <VerticalList
                elements={[
                  <Text type="captionUppercase" bold color="gray6">
                    {fund.categoria === 'Renda Variável'
                      ? 'Ações'
                      : fund.categoria}
                  </Text>,
                  <Text
                    type="body"
                    bold
                    color={idFund === fund.id ? 'blue4' : 'gray5'}
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
                color={idFund === fund.id ? 'gray6' : 'gray5'}
                css={`
                  -webkit-text-security: ${displayInformation
                    ? 'disc'
                    : 'none'};
                `}
              >
                {fund.saldo_bruto}
              </Text>,
            ]}
          />
        </FundItem>
      ))}
    </CardStyled>
  )
}

export default FundsList
