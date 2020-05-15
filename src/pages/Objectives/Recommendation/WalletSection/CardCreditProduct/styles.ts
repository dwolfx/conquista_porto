import { Col, Row } from 'styled-bootstrap-grid'

import styled from 'styled-components'
import Card from 'components/Card'
import Text from 'components/Text'

export const FullHeightCard = styled(Card)`
  height: 100%;
  position: relative;

  @media ${props => props.theme.mediaQueries.md} {
    height: inherit;
    margin-top: ${props => props.theme.spacing(6)}px;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    margin-top: 0;
  }
`

export const CardContainer = styled.div`
  margin: ${({theme}) => `${theme.spacing(4)}px ${theme.spacing(2)}px`};
`

export const InfoItem = styled(Col)`
  margin-top:  ${props => props.theme.spacing(5)}px;

  @media ${props => props.theme.mediaQueries.md} {
    margin-top: ${props => props.theme.spacing(3)}px;
  }
`

export const TextValue = styled(Text)`
  display: flex;
  margin-top: ${props => props.theme.spacing(1)}px;

  svg {
    margin-left: ${props => props.theme.spacing(2)}px;
  }
`

export const ListItems = styled(Row)``
