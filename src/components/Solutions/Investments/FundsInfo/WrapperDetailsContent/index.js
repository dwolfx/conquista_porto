import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import {
  Container,
  LineWrapper,
  DetailItem,
  Title,
  SubTitle,
  Text,
} from './styles'

export default function WrapperDetailsContent({ title, fundsDetail }) {
  const startDate = new Date(fundsDetail.data_inicio)

  return (
    <Container>
      <Title>{title}</Title>
      <LineWrapper>
        {/* <DetailItem>
          <SubTitle>CNPJ</SubTitle>
          <Text>{fundsDetail.value1}</Text>
        </DetailItem> */}
        <DetailItem>
          <SubTitle>Data de início</SubTitle>
          <Text>{moment(startDate).format('DD/MM/YYYY')}</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        {/* <DetailItem>
          <SubTitle>Gestor</SubTitle>
          <Text>{fundsDetail.value3}</Text>
        </DetailItem> */}
        <DetailItem>
          <SubTitle>Benchmark</SubTitle>
          <Text>{fundsDetail.benchmark.nome}</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        {/* <DetailItem>
          <SubTitle>PL atual</SubTitle>
          <Text>{fundsDetail.value5}</Text>
        </DetailItem> */}
        <DetailItem>
          <SubTitle>Taxa de administração</SubTitle>
          <Text>{fundsDetail.taxa_administracao}% a.a</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        {/* <DetailItem>
          <SubTitle>PL Médio 12M</SubTitle>
          <Text>{fundsDetail.value7}</Text>
        </DetailItem> */}
        <DetailItem>
          <SubTitle>Taxa de performance</SubTitle>
          <Text>{fundsDetail.taxa_performance}% sobre o que exceder</Text>
        </DetailItem>
      </LineWrapper>
    </Container>
  )
}

WrapperDetailsContent.propTypes = {
  title: PropTypes.string.isRequired,
  fundsDetail: PropTypes.shape({
    data_inicio: PropTypes.string,
    benchmark: PropTypes.shape({
      nome: PropTypes.string,
    }),
    taxa_administracao: PropTypes.string,
    taxa_performance: PropTypes.string,
  }).isRequired,
}
