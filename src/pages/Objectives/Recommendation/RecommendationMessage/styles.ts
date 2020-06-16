import styled, { css } from 'styled-components'

import { Col, Row } from 'styled-bootstrap-grid'
import TextComponent from 'components/Text'

export const GridRow = styled(Row)`
  justify-content: center;
`

export const GridCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`

interface IRecommendationText {
  hasSuggestionGoal: boolean
}

export const RecommendationText = styled.div<IRecommendationText>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ hasSuggestionGoal }) =>
    hasSuggestionGoal &&
    css`
      flex-direction: column;
    `};

  margin: ${({ theme }) => theme.spacing(4)}px 0;

  width: ${({ hasSuggestionGoal, theme }) =>
    hasSuggestionGoal ? `${theme.spacing(61)}px` : `100%`};

  @media ${({ theme }) => theme.mediaQueries.sm} {
    width: ${({ hasSuggestionGoal, theme }) =>
      hasSuggestionGoal ? `${theme.spacing(47)}px` : `${theme.spacing(36)}px`};
    flex-direction: column;
  }
`

export const Message = styled(TextComponent).attrs(() => ({
  type: 'heading4',
  color: 'gray6',
}))`
  display: flex;
  text-align: center;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`
