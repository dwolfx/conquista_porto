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
  return (
    <Container>
      <Title>{title}</Title>
      <LineWrapper>
        <DetailItem>
          <SubTitle>Classificação</SubTitle>
          <Text>{taxationData.value1}</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        <DetailItem>
          <SubTitle>Até 180 dias</SubTitle>
          <Text>{taxationData.value2}</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        <DetailItem>
          <SubTitle>De 181 a 360 dias</SubTitle>
          <Text>{taxationData.value3}</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        <DetailItem>
          <SubTitle>De 361 a 720 dias</SubTitle>
          <Text>{taxationData.value4}</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        <DetailItem>
          <SubTitle>Acima de 720 dias</SubTitle>
          <Text>{taxationData.value5}</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        <DetailItem>
          <SubTitle>IOF</SubTitle>
          <Text>{taxationData.value6}</Text>
        </DetailItem>
      </LineWrapper>
    </Container>
  )
}

Taxation.propTypes = {
  title: PropTypes.string.isRequired,
  taxationData: PropTypes.shape({
    value1: PropTypes.string,
    value2: PropTypes.string,
    value3: PropTypes.string,
    value4: PropTypes.string,
    value5: PropTypes.string,
    value6: PropTypes.string,
  }).isRequired,
}
