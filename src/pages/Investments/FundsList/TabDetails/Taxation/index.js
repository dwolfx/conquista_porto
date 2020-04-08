import React from 'react'
import PropTypes from 'prop-types'

import VerticalList from 'components/VerticalList'

import {
  Li,
  LiTitle,
  LiValue,
  ScaleIcon,
  TaxationInfo,
  Text,
  Title,
  TitleWrapper,
  TaxationWrapper,
  Ul,
} from './styles'

export const Taxation = ({ fund }) => {
  const renderAliquotas = aliquota =>
    aliquota
      ? [aliquota]
          .flatMap(item => item)
          .map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Li key={`aliquota-${index}`}>
              <VerticalList
                elements={[
                  <LiTitle>{item.faixa}</LiTitle>,
                  item.faixa !== 'ISENTO' && <LiValue>{item.valor}%</LiValue>,
                ]}
              />
            </Li>
          ))
      : null

  return (
    <TaxationWrapper>
      <TitleWrapper>
        <ScaleIcon />
        <Title>Tributação (IR)</Title>
      </TitleWrapper>
      <Ul>
        {fund.classificacao && (
          <Li>
            <VerticalList
              elements={[
                <LiTitle>Classificação</LiTitle>,
                <LiValue>{fund.classificacao}</LiValue>,
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
              <LiValue>
                {fund.regime_iof === 'Regime Regressivo'
                  ? 'Regressivo'
                  : fund.regime_iof}
              </LiValue>,
            ]}
          />
        )}
      </Ul>
      <TaxationInfo>
        <Text>
          Haverá incidência de iof regressivo caso ocorram resgates antes de 30
          dias corridos da data da aplicação.
        </Text>
      </TaxationInfo>
    </TaxationWrapper>
  )
}

export default Taxation

Taxation.propTypes = {
  fund: PropTypes.shape({
    aplicao_minima: PropTypes.string,
    aplicacao_cotizacao: PropTypes.string,
    aplicacao_financeiro: PropTypes.string,
    resgate_cotizacao: PropTypes.string,
    resgate_financeiro: PropTypes.string,
    hora_aplicacao: PropTypes.string,
    minimo_inicial: PropTypes.string,
    saldo_minimo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    classificacao: PropTypes.string,
    aliquotas_ir: PropTypes.shape({
      aliquota: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    }),
    regime_iof: PropTypes.string,
  }).isRequired,
}
