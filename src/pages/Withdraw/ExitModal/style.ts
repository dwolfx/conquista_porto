import styled from 'styled-components'
import Prompt from 'components/Modal/Prompt'
import { ModalContainer } from 'components/Modal/stylesNew'
import { ButtonContainerModal } from 'components/Modal/Prompt/styles'

export const ModalStyled = styled(Prompt)`
  padding: ${({ theme }) => theme.spacing(2)}px;

  ${ModalContainer} {
    width: 418px;
  }

  ${ButtonContainerModal} {
    button {
      &:first-child {
        width: 225px;
      }
      &:last-child {
        width: 85px;
      }
    }
  }
`

export const ModalBody = styled.div`
  ${({ theme }) => theme.fontTypes.headline}
  font-weight: 300;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing(5)}px;
  button:last-child {
    margin-left: ${({ theme }) => theme.spacing(1)}px;
  }
`
