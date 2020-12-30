import styled from 'styled-components'

import Button from 'components/Button'
import ModalCmp from 'components/Modal/ModalNew'

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
