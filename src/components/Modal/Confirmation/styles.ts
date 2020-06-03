import styled from 'styled-components'
import Modal from 'components/Modal/ModalNew'

export const ModalStyled = styled(Modal)`
  z-index: 14;
  > div + div {
    max-width: 484px;
  }
`

export const ButtonContainerModal = styled.div`
  display: flex;
  padding-top: ${({ theme }) => theme.spacing(5)}px;
  justify-content: flex-end;
  button {
    &:last-of-type {
      margin-left: 14px;
    }
  }
`
