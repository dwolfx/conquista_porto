import styled from 'styled-components'

import Button from 'components/Button'
import CheckboxCmp from 'components/Inputs/Checkbox'
import DivisorCmp from 'components/Divisor'
import ModalCmp from 'components/Modal/ModalNew'
import { ModalContainer, ChildrenWrapper } from 'components/Modal/stylesNew'

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
  width: ${({ theme }) => `calc(100% + ${theme.spacing(2)}px)`};
`

export const DrawerItem = styled.div`
  button {
    margin-top: ${({ theme }) => theme.spacing(3)}px;
    width: 100%;
  }
`

export const Checkbox = styled(CheckboxCmp)`
  align-items: center;
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  width: 100%;
`

export const Modal = styled(ModalCmp)`
  z-index: 14;
`

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ModalButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`

export const RedeemModal = styled(ModalCmp)`
  ${ModalContainer} {
    height: 100%;

    ${ChildrenWrapper} {
      flex: 1;
    }
  }
`
