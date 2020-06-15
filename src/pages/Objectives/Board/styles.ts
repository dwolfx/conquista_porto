import styled from 'styled-components'

import { Col } from 'styled-bootstrap-grid'

export const BoardWrapper = styled.div`
  padding: ${props =>
    `0 ${props.theme.spacing(6)}px ${props.theme.spacing(5)}px`};
  width: 100%;

  @media ${props => props.theme.mediaQueries.md} {
    padding: ${props =>
      `${props.theme.spacing(2)}px ${props.theme.spacing(3)}px`};
  }

  @media ${props => props.theme.mediaQueries.sm} {
    padding: ${props => props.theme.spacing(2)}px;
  }
`

export const ColCard = styled(Col)`
  margin-top: ${props => props.theme.spacing(5)}px;

  @media ${props => props.theme.mediaQueries.lg} {
    margin-top: ${props => props.theme.spacing(3)}px;
  }
`
