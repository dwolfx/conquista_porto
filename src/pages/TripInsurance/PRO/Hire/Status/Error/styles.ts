import styled from 'styled-components'
import Flexible from 'components/FlexibleLayerContent'
import { Content } from 'components/FlexibleLayerContent/styles'

export const FlexibleLayerContent = styled(Flexible)`
  ${Content} {
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    * {
      margin-bottom: ${({ theme }) => theme.spacing(3)}px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`
