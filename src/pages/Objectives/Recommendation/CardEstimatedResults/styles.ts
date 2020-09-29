import styled from 'styled-components'

import { Row } from 'styled-bootstrap-grid'
import TextComponent from 'components/Text'
import IconComponent from 'components/IconExporter'
import VerticalListComponent from 'components/VerticalList'

export const BodyCard = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.spacing(5)}px 0 ${theme.spacing(4)}px`};

  @media ${props => props.theme.mediaQueries.sm} {
    padding: ${({ theme }) => `${theme.spacing(4)}px 0 ${theme.spacing(3)}px`};
  }
`

export const GridRow = styled(Row)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`

export const IncomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
  }
`

export const TextContainer = styled.div`
  text-align: center;
  max-width: 686px;
  margin: 0 auto ${({ theme }) => theme.spacing(5)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    & :last-child {
      display: inline;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    max-width: 287px;
    text-align: initial;
  }
`

export const Text = styled(TextComponent).attrs(() => ({
  type: 'headline',
  color: 'gray6',
}))`
  display: inline;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    display: block;
  }
`

export const DashedText = styled(TextComponent).attrs(() => ({
  type: 'headline',
  color: 'gray6',
}))`
  display: inline;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.gray4};
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

export const PopOverTextContainer = styled.div`
  max-width: 427px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    max-width: 175px;
  }
`

export const PopOverText = styled(TextComponent).attrs(() => ({
  type: 'body',
  bold: true,
  color: 'gray5',
}))`
  @media ${({ theme }) => theme.mediaQueries.md} {
    display: inline;
  }
`

export const VerticalList = styled(VerticalListComponent)`
  text-align: center;
  width: auto;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    & + & {
      margin-top: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`

export const EstimateTitle = styled(TextComponent).attrs(() => ({
  type: 'captionUppercase',
  bold: true,
  color: 'gray4',
}))``

interface IEstimateLabel {
  probableEstimateLabel?: boolean
  isBelowTheGoal?: boolean
}

export const EstimateValue = styled(TextComponent).attrs(() => ({
  type: 'headline',
  bold: true,
}))<IEstimateLabel>`
  color: ${({ probableEstimateLabel, isBelowTheGoal, theme }) =>
    probableEstimateLabel
      ? isBelowTheGoal
        ? theme.colors.magenta2
        : theme.colors.green4
      : theme.colors.gray6};
`

export const InformativeIcon = styled(IconComponent).attrs(() => ({
  name: 'information',
  width: 21,
  color: 'gray4',
}))`
  vertical-align: middle;
`
