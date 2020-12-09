import styled from 'styled-components'
import Flexible from 'components/FlexibleLayerContent'
import { Content } from 'components/FlexibleLayerContent/styles'

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export const FlexibleLayerContent = styled(Flexible)`
  ${Content} {
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`

export const UserBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing(14)}px;
  width: 297px;
  & > * {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`
