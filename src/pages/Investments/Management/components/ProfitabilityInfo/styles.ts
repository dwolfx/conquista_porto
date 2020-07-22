import styled from 'styled-components'

import { Col } from 'styled-bootstrap-grid'

import Card from 'components/Card'
import VerticalList from 'components/VerticalList'
import HorizonalList from 'components/HorizontalList'
import Text from 'components/Text'

export const TextHeader = styled(Text).attrs(() => ({
  type: 'captionUppercase',
  color: 'gray5',
  bold: true,
}))`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const TextValue = styled(Text).attrs(() => ({
  type: 'title',
  color: 'gray6',
  bold: true,
}))``

export const TextTitle = styled(Text).attrs(() => ({
  type: 'captionUppercase',
  color: 'gray6',
  bold: true,
}))``

export const CardStyled = styled(Card)`
  padding: ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.md} {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const VerticalListStyled = styled(VerticalList)`
  padding: 0;
`

export const HorizonalListStyled = styled(HorizonalList)`
  padding: 0;
  margin: 0 !important;
  height: 35px;
`

export const StyledCol = styled(Col)`
  @media ${props => props.theme.mediaQueries.mdUp} {
    :last-child {
      margin-top: 14px;
    }
  }
`
