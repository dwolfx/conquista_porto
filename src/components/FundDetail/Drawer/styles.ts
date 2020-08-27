import styled from 'styled-components'

import Button from 'components/Button'
import IconExporter from 'components/IconExporter'
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

export const ButtonSubmit = styled(Button)`
  width: 100%;
`
export const EmptyStateWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 430px;
  margin: auto;
`

export const LockFundWrapper = styled.div`
  display: flex;
  width: 270px;
  justify-content: space-between;
  align-items: center;
`

export const LockIcon = styled(IconExporter).attrs(() => ({ name: 'lock2' }))`
  fill: ${props => props.theme.colors.gray6};
  height: 21px;
  width: 21px;
`

export const CloseButton = styled(IconExporter)`
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`
