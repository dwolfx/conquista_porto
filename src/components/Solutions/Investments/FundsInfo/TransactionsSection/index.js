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
            <SubTitleWrapper>Aplicação Inicial</SubTitleWrapper>
            <ValueWrapper>{formatMoney(articles.minimo_inicial)}</ValueWrapper>
          </ArticleItem>
          <ArticleItem>
            <SubTitleWrapper>Movimentação Mín.</SubTitleWrapper>
            <ValueWrapper>{formatMoney(articles.aplicao_minima)}</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
        <ResponsiveLine>
          <ArticleItem>
            <SubTitleWrapper>Saldo Mín.</SubTitleWrapper>
            <ValueWrapper>
              {typeof articles.saldo_minimo === 'string' || undefined
                ? '-'
                : formatMoney(articles.saldo_minimo)}
            </ValueWrapper>
          </ArticleItem>
          <ArticleItem>
            <SubTitleWrapper>Horário Limite da Aplic.</SubTitleWrapper>
            <ValueWrapper>{articles.hora_aplicacao}</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
      </Wrapper>
      <Wrapper>
        <ResponsiveLine>
          <ArticleItem>
            <SubTitleWrapper>Aplicação (Cotização)</SubTitleWrapper>
            <ValueWrapper>{articles.aplicacao_cotizacao} Úteis</ValueWrapper>
          </ArticleItem>
          <ArticleItem>
            <SubTitleWrapper>Aplicação (Financeiro)</SubTitleWrapper>
            <ValueWrapper>{articles.aplicacao_financeiro} Úteis</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
        <ResponsiveLine>
          <ArticleItem>
            <SubTitleWrapper>Resgate (Cotização)</SubTitleWrapper>
            <ValueWrapper>{articles.resgate_cotizacao} Corridos</ValueWrapper>
          </ArticleItem>
          <ArticleItem>
            <SubTitleWrapper>Resgate (Financeiro)</SubTitleWrapper>
            <ValueWrapper>{articles.resgate_financeiro} Úteis</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
      </Wrapper>
    </Container>
  )
}

TransactionsSection.propTypes = {
  title: PropTypes.string.isRequired,
  articles: PropTypes.shape({
    aplicao_minima: PropTypes.string,
    aplicacao_cotizacao: PropTypes.string,
    aplicacao_financeiro: PropTypes.string,
    resgate_cotizacao: PropTypes.string,
    resgate_financeiro: PropTypes.string,
    hora_aplicacao: PropTypes.string,
    contagem_dias_resgate: PropTypes.string,
    minimo_inicial: PropTypes.string,
    saldo_minimo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
}
