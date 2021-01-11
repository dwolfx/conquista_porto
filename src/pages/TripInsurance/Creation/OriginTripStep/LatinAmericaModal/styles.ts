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

export const Button = styled(ButtonCmp)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
  width: 110px;
`
