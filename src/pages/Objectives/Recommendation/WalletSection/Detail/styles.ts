import styled from 'styled-components'
import Drawer from 'components/Drawer'
import { DrawerBody } from 'components/Drawer/styles'

export const DrawerDetail = styled(Drawer)`
  ${DrawerBody} {
    @media ${props => props.theme.mediaQueries.sm} {
      padding: ${({ theme }) => theme.spacing(4)}px
        ${({ theme }) => theme.spacing(2)}px;
    }
  }
`
