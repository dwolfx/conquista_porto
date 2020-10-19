import styled from 'styled-components'

import DivisorCmp from 'components/Divisor'
import LayerCmp from 'components/Layer'
import { LayerHeader } from 'components/Layer/styles'

export const Layer = styled(LayerCmp)`
  ${LayerHeader} {
    padding: 0;
    border-bottom: none;
  }
`

export const DrawerHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;

  svg {
    cursor: pointer;
    margin: 0;
  }
`

export const DrawerTitle = styled.div`
  display: flex;
  flex-direction: column;

  p {
    &:first-of-type {
      margin-bottom: ${({ theme }) => theme.spacing(0.5)}px;
    }
  }
`

export const Divisor = styled(DivisorCmp)`
  margin: ${({ theme }) => `${theme.spacing(3)}px 0`};
  margin-left: ${({ theme }) => -theme.spacing(2)}px;
  width: ${({ theme }) => `calc(100% + ${theme.spacing(2)})`}px;
`

export const DrawerItem = styled.div`
  button {
    margin-top: ${({ theme }) => theme.spacing(3)}px;
    width: 100%;
  }
`
