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
  return (
    <Container>
      <Title>{title}</Title>
      <LineWrapper>
        <DetailItem>
          <SubTitle>Data de início</SubTitle>
          <Text>{moment(fundsDetail.data_inicio).format('DD/MM/YYYY')}</Text>
        </DetailItem>
        <DetailItem>
          <SubTitle>Benchmark</SubTitle>
          <Text>{fundsDetail.benchmark.nome}</Text>
        </DetailItem>
      </LineWrapper>
      <LineWrapper>
        <DetailItem>
          <SubTitle>Taxa de administração</SubTitle>
          <Text>{fundsDetail.taxa_administracao}% a.a</Text>
        </DetailItem>
        <DetailItem>
          <SubTitle>Taxa de performance</SubTitle>
          {Number(fundsDetail.taxa_performance) === 0 ? (
            <Text>Não há cobrança de performance</Text>
          ) : (
            <Text>{fundsDetail.taxa_performance}% sobre o que exceder</Text>
          )}
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
    nome_gestor: PropTypes.string,
    valor_patrimonio_liq: PropTypes.string,
  }).isRequired,
}
