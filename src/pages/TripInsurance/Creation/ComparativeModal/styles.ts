import styled from 'styled-components'

import ModalNew from 'components/Modal/ModalNew'
import { ModalContainer, ChildrenWrapper } from 'components/Modal/stylesNew'

export const Modal = styled(ModalNew)`
  ${ModalContainer} {
    max-width: 1066px;

    @media ${props => props.theme.mediaQueries.lg} {
      max-width: 816px;
    }

    @media ${props => props.theme.mediaQueries.md} {
      max-width: 606px;
      min-width: unset;
      top: auto;
      margin: 0;
      max-height: calc(100vh - (14px * 2));
    }
  }
  ${ChildrenWrapper} {
    padding: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}px`};
    @media ${props => props.theme.mediaQueries.xs} {
      padding: 0px;
    }
  }
`
