import styled from 'styled-components'

import ModalNew from 'components/Modal/ModalNew'
import { ModalContainer, ChildrenWrapper } from 'components/Modal/stylesNew'

export const Modal = styled(ModalNew)`
  ${ModalContainer} {
    @media ${props => props.theme.mediaQueries.md} {
      min-width: unset;
      width: calc(100vw - 28px);
      top: auto;
      margin: 0;
      max-height: calc(100vh - (14px * 2));
    }
  }
  ${ChildrenWrapper} {
    @media ${props => props.theme.mediaQueries.md} {
      padding-top: ${({ theme }) => theme.spacing(0)}px;
    }
  }
`
