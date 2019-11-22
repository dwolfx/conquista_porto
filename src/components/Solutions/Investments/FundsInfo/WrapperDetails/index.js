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

export default function WrapperDetails({ title, fundsDetail }) {
  return (
    <Container>
      <Title>{title}</Title>
      <LineWrapper>
        <DetailItem>
          <SubTitle>CNPJ</SubTitle>
          <Text>{fundsDetail.value1}</Text>
        </DetailItem>
        <DetailItem>
          <SubTitle>Data de início</SubTitle>
          <Text>{fundsDetail.value2}</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        <DetailItem>
          <SubTitle>Gestor</SubTitle>
          <Text>{fundsDetail.value3}</Text>
        </DetailItem>
        <DetailItem>
          <SubTitle>Benchmark</SubTitle>
          <Text>{fundsDetail.value4}</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        <DetailItem>
          <SubTitle>PL atual</SubTitle>
          <Text>{fundsDetail.value5}</Text>
        </DetailItem>
        <DetailItem>
          <SubTitle>Taxa de administração</SubTitle>
          <Text>{fundsDetail.value6}</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        <DetailItem>
          <SubTitle>PL Médio 12M</SubTitle>
          <Text>{fundsDetail.value7}</Text>
        </DetailItem>
        <DetailItem>
          <SubTitle>Taxa de performance</SubTitle>
          <Text>{fundsDetail.value8}</Text>
        </DetailItem>
      </LineWrapper>
    </Container>
  )
}

WrapperDetails.propTypes = {
  title: PropTypes.string.isRequired,
  fundsDetail: PropTypes.shape({
    value1: PropTypes.string,
    value2: PropTypes.string,
    value3: PropTypes.string,
    value4: PropTypes.string,
    value5: PropTypes.string,
    value6: PropTypes.string,
    value7: PropTypes.string,
    value8: PropTypes.string,
  }).isRequired,
}
