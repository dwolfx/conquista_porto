import styled from 'styled-components'

import { Container, Row, Col } from 'styled-bootstrap-grid'
import TextComponent from 'components/Text'

export const GridContainer = styled(Container)`
  padding: 14px 0;
`

export const GridRow = styled(Row)``
export const GridCol = styled(Col)``

export const TextWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;

  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0 0.5rem;
  }
`
export const Text = styled(TextComponent).attrs(() => ({
  type: 'caption',
}))``

export const Link = styled.a`
  color: ${props => props.theme.colors.blue4};
  font-weight: bold;
  text-transform: uppercase;
`

export const ImgAnbima = styled.img`
  margin-top: 2rem;
  @media ${props => props.theme.mediaQueries.lgUp} {
    margin-left: 2rem;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0 1rem;
    max-width: 100%;
  }
`
