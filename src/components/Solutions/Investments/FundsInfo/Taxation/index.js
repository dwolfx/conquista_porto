/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  LineWrapper,
  DetailItem,
  Title,
  SubTitle,
  Text,
} from './styles'

export default function Taxation({ title, taxationData }) {
  const renderAliquotas = aliquota =>
    aliquota
      ? aliquota.map((item, index) => (
          <LineWrapper key={`aliquota-${index}`}>
            <DetailItem>
              <SubTitle>{item.faixa}</SubTitle>
              <Text>{item.valor}%</Text>
            </DetailItem>
          </LineWrapper>
        ))
      : null

  return (
    <Container>
      <Title>{title}</Title>
      <LineWrapper>
        <DetailItem>
          <SubTitle>Classificação</SubTitle>
          <Text>{taxationData.classificacao}</Text>
        </DetailItem>
      </LineWrapper>
      {renderAliquotas(taxationData.aliquotas_ir.aliquota)}
      <LineWrapper>
        <DetailItem>
          <SubTitle>IOF</SubTitle>
          <Text>{taxationData.regime_iof}</Text>
        </DetailItem>
      </LineWrapper>
    </Container>
  )
}

Taxation.propTypes = {
  title: PropTypes.string.isRequired,
  taxationData: PropTypes.shape({
    classificacao: PropTypes.string,
    regime_iof: PropTypes.string,
    aliquotas_ir: PropTypes.shape({
      aliquota: PropTypes.array,
    }),
  }).isRequired,
}
