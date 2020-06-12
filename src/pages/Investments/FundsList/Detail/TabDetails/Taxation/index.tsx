import React from 'react'
import { uuid } from 'uuidv4'

import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import { formatNumber } from 'helpers'
import { StyledIcon } from 'pages/Investments/FundsList/styles'

import {
  Li,
  LiTitle,
  LiValue,
  TaxationInfo,
  TaxationWrapper,
  Ul,
} from './styles'

interface IFund {
  fund: {
    classificacao: string
    aliquotas_ir: { aliquota: IAliquota[] }
    regime_iof: string
  }
}

interface IAliquota {
  faixa: string
  valor: string
}

export const Taxation = ({ fund }: IFund) => {
  const renderAliquotas = (aliquota: IAliquota[]) =>
    aliquota
      ? [aliquota]
          .flatMap(item => item)
          .map(item => (
            <Li key={uuid()}>
              <VerticalList
                elements={
                  item.faixa.toLowerCase() === 'isento'
                    ? [<LiTitle>IR</LiTitle>, <LiValue bold>Isento</LiValue>]
                    : [
                        <LiTitle>{item.faixa}</LiTitle>,
                        <LiValue bold>{formatNumber(item.valor)}%</LiValue>,
                      ]
                }
              />
            </Li>
          ))
      : null

  return (
    <TaxationWrapper>
      <HorizontalList
        noPadding
        startItems={[
          <StyledIcon name="scale" />,
          <Text color="gray6" type="subheading" bold>
            TRIBUTAÇÃO (IR)
          </Text>,
        ]}
      />
      <Ul>
        {fund.classificacao && (
          <Li>
            <VerticalList
              elements={[
                <LiTitle>Classificação</LiTitle>,
                <LiValue bold>{fund.classificacao}</LiValue>,
              ]}
            />
          </Li>
        )}
        {fund && fund.aliquotas_ir && fund.aliquotas_ir.aliquota
          ? renderAliquotas(fund.aliquotas_ir.aliquota)
          : null}
        {fund.regime_iof && (
          <VerticalList
            elements={[
              <LiTitle>IOF</LiTitle>,
              <LiValue bold>
                {fund.regime_iof === 'Regime Regressivo'
                  ? 'Regressivo'
                  : fund.regime_iof}
              </LiValue>,
            ]}
          />
        )}
      </Ul>
      <TaxationInfo>
        <Text color="gray6" type="captionUppercase" bold>
          Haverá incidência de iof regressivo caso ocorram resgates antes de 30
          dias corridos da data da aplicação.
        </Text>
      </TaxationInfo>
    </TaxationWrapper>
  )
}

export default Taxation
