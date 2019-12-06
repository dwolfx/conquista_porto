import React from 'react'
import PropTypes from 'prop-types'

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
            <ValueWrapper>{articles.value1}</ValueWrapper>
          </ArticleItem>
          <ArticleItem>
            <SubTitleWrapper>Movimentação Mín.</SubTitleWrapper>
            <ValueWrapper>{articles.value2}</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
        <ResponsiveLine>
          <ArticleItem>
            <SubTitleWrapper>Saldo Mín.</SubTitleWrapper>
            <ValueWrapper>{articles.value3}</ValueWrapper>
          </ArticleItem>
          <ArticleItem>
            <SubTitleWrapper>Horário Limite da Aplic.</SubTitleWrapper>
            <ValueWrapper>{articles.value4}</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
      </Wrapper>
      <Wrapper>
        <ResponsiveLine>
          <ArticleItem>
            <SubTitleWrapper>Aplicação (Cotização)</SubTitleWrapper>
            <ValueWrapper>{articles.value5}</ValueWrapper>
          </ArticleItem>
          <ArticleItem>
            <SubTitleWrapper>Aplicação (Financeiro)</SubTitleWrapper>
            <ValueWrapper>{articles.value6}</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
        <ResponsiveLine>
          <ArticleItem>
            <SubTitleWrapper>Resgate (Cotização)</SubTitleWrapper>
            <ValueWrapper>{articles.value7}</ValueWrapper>
          </ArticleItem>
          <ArticleItem>
            <SubTitleWrapper>Resgate (Financeiro)</SubTitleWrapper>
            <ValueWrapper>{articles.value8}</ValueWrapper>
          </ArticleItem>
        </ResponsiveLine>
      </Wrapper>
    </Container>
  )
}

TransactionsSection.propTypes = {
  title: PropTypes.string.isRequired,
  articles: PropTypes.shape({
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
