import styled from 'styled-components'
import Card from 'components/Card'

export const LayerCard = styled(Card)`
  height: 460px;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  display: flex;

  @media ${props => props.theme.mediaQueries.lg} {
    height: auto;
  }
`

export const CardContent = styled.div`
  overflow: auto;
  flex: 1;

  @media ${props => props.theme.mediaQueries.lg} {
    margin: ${props => props.theme.spacing(2)}px 0px;
  }
`
