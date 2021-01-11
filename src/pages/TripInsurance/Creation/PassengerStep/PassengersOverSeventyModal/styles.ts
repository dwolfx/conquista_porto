import styled from 'styled-components'

import ModalNew from 'components/Modal/ModalNew'
import { ModalContainer, ChildrenWrapper } from 'components/Modal/stylesNew'
import ButtonCmp from 'components/Button'

export const Modal = styled(ModalNew)`
  ${ModalContainer} {
    width: 418px;
    top: unset;

    @media ${({ theme }) => theme.mediaQueries.sm} {
      width: 332px;
    }
  }

  ${ChildrenWrapper} {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`

interface IButton {
  isLastStep: boolean
}

export const Button = styled(ButtonCmp)<IButton>`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
  ${({ isLastStep }) => (isLastStep ? `width: 185px;` : `width: 110px;`)}
`
