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

interface ITributeIR {
  1?: number
  180?: number
  360?: number
  720?: number
  721?: number
}

interface IFund {
  fund: {
    tribute_ir: null | ITributeIR | undefined
    classification: string
    iof: string
  }
}

export const Taxation = ({ fund, ...rest }: IFund) => {
  const labels = {
    1: '',
    180: 'Até 180 dias',
    360: 'de 181 dias a 360 dias',
    720: 'DE 361 DIAS A 720 DIAS',
    721: 'ACIMA DE 720',
  }

  const renderAliquotas = (tribute_ir: ITributeIR | null) =>
    tribute_ir !== null &&
    Object.entries(tribute_ir).map(([key, value]) => {
      return key !== '1' ? (
        <Li key={uuid()}>
          <VerticalList
            elements={[
              <LiTitle>{(labels as any)[key]}</LiTitle>,
              <LiValue bold>{formatNumber(value)}%</LiValue>,
            ]}
          />
        </Li>
      ) : null
    })

  return (
    <TaxationWrapper {...rest}>
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
        {fund.classification && (
          <Li>
            <VerticalList
              elements={[
                <LiTitle>Classificação</LiTitle>,
                <LiValue bold>{fund.classification}</LiValue>,
              ]}
            />
          </Li>
        )}
        {fund && !!fund.tribute_ir && renderAliquotas(fund.tribute_ir)}
        {fund.iof && (
          <VerticalList
            elements={[
              <LiTitle>IOF</LiTitle>,
              <LiValue bold>
                {fund.iof === 'Regime Regressivo' ? 'Regressivo' : fund.iof}
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
