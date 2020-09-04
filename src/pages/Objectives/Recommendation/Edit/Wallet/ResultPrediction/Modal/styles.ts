import styled from 'styled-components'

import ButtonComponent from 'components/Button'
import ModalNew from 'components/Modal/ModalNew'
import { ModalContainer } from 'components/Modal/stylesNew'
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

export const Button = styled(ButtonComponent)`
  width: 133px;
`
