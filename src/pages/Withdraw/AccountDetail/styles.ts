import styled from 'styled-components'
import Card from 'components/Card'
import Button from 'components/Button'

export const LayerCard = styled(Card)`
  height: 100%;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  border-radius: 0px;
  display: flex;

  @media ${props => props.theme.mediaQueries.smUp} {
    height: auto;
    max-height: 100%;
    padding: 10px ${({ theme }) => theme.spacing(2)}px 10px;
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    border-radius: 8px;
  }
  @media ${props => props.theme.mediaQueries.mdUp} {
    margin-bottom: 0px;
    height: 100%;
  }
  @media ${props => props.theme.mediaQueries.xs} {
    border: 0;
  }
`

export const CardContent = styled.div`
  overflow: auto;
  flex: 1;
`

export const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
`

export const FullButton = styled(Button)`
  margin: ${props => props.theme.spacing(2)}px;
  margin-bottom: ${props => props.theme.spacing(1)}px;
  width: 100%;
`
