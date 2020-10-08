import styled from 'styled-components'
import Card from 'components/Card'

export const LayerCard = styled(Card)`
  height: 460px;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  display: flex;
`

export const CardContent = styled.div`
  overflow: auto;
  flex: 1;
`
