import styled from 'styled-components'

import Button from 'components/Button'
import Card from 'components/Card'
import HorizontalList from 'components/HorizontalList'
import Icon from 'components/IconExporter'
import Loading from 'components/Loading'
import Text from 'components/Text'
import VerticalList from 'components/VerticalList'

import { CardBody } from 'components/Card/styles'
import { LegendText } from 'components/Loading/styles'

export const CustomHorizontalList = styled(HorizontalList)`
  padding: 0;
  height: auto;

  @media ${props => props.theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.spacing(3)}px
      ${({ theme }) => theme.spacing(2)}px 0;
  }
`

export const CardStyled = styled(Card)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`};
  min-height: 287px;

  ${CardBody} {
    justify-content: center;
  }
`

export const CustomVerticalList = styled(VerticalList)`
  padding: 0;
  margin-bottom: 10px;
`

export const InfoContainer = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`};

  @media ${props => props.theme.mediaQueries.md} {
    padding: 0;
  }
`

export const TextCaption = styled(Text).attrs(() => ({
  type: 'captionUppercase',
  color: 'gray4',
}))`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const TextError = styled(Text).attrs(() => ({
  type: 'captionUppercase',
  color: 'magenta2',
}))`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const TextHeadline = styled(Text).attrs(() => ({
  type: 'headline',
  color: 'gray6',
  bold: true,
}))`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
`

export const ButtonBlock = styled(Button)`
  width: 100%;
  white-space: nowrap;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;

  &:first-child {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const LoadingStyled = styled(Loading)`
  ${LegendText} {
    text-align: center;
  }
`

export const IconRetry = styled(Icon).attrs(() => ({
  name: 'reload',
  color: 'blue4',
}))`
  cursor: pointer;
  margin: 0 0 0 ${({ theme }) => theme.spacing(2)}px !important;
  height: ${({ theme }) => theme.spacing(3)}px;
  width: ${({ theme }) => theme.spacing(3)}px;
`
