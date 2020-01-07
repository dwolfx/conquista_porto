import React from 'react'
import PropTypes from 'prop-types'

import { formatMoney } from 'helpers'

import {
  Container,
  Title,
  ArticleItem,
  SubTitleWrapper,
  ValueWrapper,
  Wrapper,
  ResponsiveLine,
} from './styles'

export default function TransactionsSection({ title, articles }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Wrapper>
        <ResponsiveLine>
          <ArticleItem>
            <SubTitleWrapper>Aplicação</SubTitleWrapper>
            <ValueWrapper>{formatMoney(articles.aplicao_minima)}</ValueWrapper>
          </ArticleItem>
          <ArticleItem>
            <SubTitleWrapper>Movimentação Mín.</SubTitleWrapper>
            <ValueWrapper>{articles.aplicao_minima}</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
        <ResponsiveLine>
          <ArticleItem>
            <SubTitleWrapper>Saldo Mín.</SubTitleWrapper>
            <ValueWrapper>{articles.aplicao_minima}</ValueWrapper>
          </ArticleItem>
          <ArticleItem>
            <SubTitleWrapper>Horário Limite da Aplic.</SubTitleWrapper>
            <ValueWrapper>{articles.hora_aplicacao}</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
      </Wrapper>
      <Wrapper>
        <ResponsiveLine>
          {/* <ArticleItem>
            <SubTitleWrapper>Aplicação (Cotização)</SubTitleWrapper>
            <ValueWrapper>{articles.aplicacao_cotizacao}</ValueWrapper>
          </ArticleItem> */}
          <ArticleItem>
            <SubTitleWrapper>Aplicação (Financeiro)</SubTitleWrapper>
            <ValueWrapper>{articles.aplicacao_financeiro}</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
        <ResponsiveLine>
          <ArticleItem>
            <SubTitleWrapper>Resgate (Cotização)</SubTitleWrapper>
            <ValueWrapper>{articles.resgate_cotizacao}</ValueWrapper>
          </ArticleItem>
          <ArticleItem>
            <SubTitleWrapper>Resgate (Financeiro)</SubTitleWrapper>
            <ValueWrapper>{articles.resgate_financeiro}</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
      </Wrapper>
    </Container>
  )
}

TransactionsSection.propTypes = {
  title: PropTypes.string.isRequired,
  articles: PropTypes.shape({
    aplicao_minima: PropTypes.number,
    aplicacao_financeiro: PropTypes.number,
    resgate_cotizacao: PropTypes.number,
    resgate_financeiro: PropTypes.number,
    hora_aplicacao: PropTypes.string,
  }).isRequired,
}
