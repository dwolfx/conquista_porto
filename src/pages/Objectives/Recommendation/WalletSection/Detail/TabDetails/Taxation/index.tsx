import React from 'react'

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
    tribute_ir: ITributeIR | undefined
    classification: string
    iof: string
  }
}

export const Taxation = ({ fund }: IFund) => {
  const renderAliquotas = (tribute_ir: ITributeIR) => (
    <>
      {tribute_ir[180] && (
        <Li>
          <VerticalList
            elements={[
              <LiTitle>Até 180 dias</LiTitle>,
              <LiValue bold>{formatNumber(tribute_ir[180])}%</LiValue>,
            ]}
          />
        </Li>
      )}
      {tribute_ir[360] && (
        <Li>
          <VerticalList
            elements={[
              <LiTitle>De 181 dias a 360 dias</LiTitle>,
              <LiValue bold>{formatNumber(tribute_ir[360])}%</LiValue>,
            ]}
          />
        </Li>
      )}
      {tribute_ir[720] && (
        <Li>
          <VerticalList
            elements={[
              <LiTitle>De 361 dias a 720 dias</LiTitle>,
              <LiValue bold>{formatNumber(tribute_ir[720])}%</LiValue>,
            ]}
          />
        </Li>
      )}
      {tribute_ir[721] && (
        <Li>
          <VerticalList
            elements={[
              <LiTitle>Acima de 720</LiTitle>,
              <LiValue bold>{formatNumber(tribute_ir[721])}%</LiValue>,
            ]}
          />
        </Li>
      )}
    </>
  )

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
        {fund &&
        fund.tribute_ir !== undefined &&
        fund.tribute_ir[1] === undefined
          ? renderAliquotas(fund.tribute_ir)
          : null}
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
