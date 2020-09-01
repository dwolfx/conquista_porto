import styled from 'styled-components'
import Prompt from 'components/Modal/Prompt'
import ModalNew from 'components/Modal/ModalNew'
import { ModalContainer } from 'components/Modal/stylesNew'
import { ButtonContainerModal } from 'components/Modal/Prompt/styles'
import { mediaQueries } from 'styles/theme'
import { Item, Items } from '../Items/styles'

const tabletAndBiggerSmartphones = `${mediaQueries.smUp} and ${mediaQueries.md}`

export const Modal = styled(ModalNew)`
  ${ModalContainer} {
    @media ${props => props.theme.mediaQueries.smUp} {
      width: 418px;
    }
  }

  ${Items} {
    margin: ${({ theme }) => theme.spacing(3)}px 0;
    @media ${tabletAndBiggerSmartphones} {
      flex-direction: column;
    }
  }

  ${Item} {
    padding: 0;
    @media ${tabletAndBiggerSmartphones} {
      flex-direction: row;
    }
  }
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    &:last-of-type {
      margin-left: 14px;
    }
  }
`
