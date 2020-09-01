import styled from 'styled-components'
import Prompt from 'components/Modal/Prompt'
import { Item, Items } from '../Items/styles'
import { ModalContainer } from 'components/Modal/stylesNew'
import { ButtonContainerModal } from 'components/Modal/Prompt/styles'
import { mediaQueries } from 'styles/theme'

const tabletAndBiggerSmartphones = `${mediaQueries.smUp} and ${mediaQueries.md}`

export const PromptStyled = styled(Prompt)`
  padding: ${({ theme }) => theme.spacing(2)}px;

  ${ModalContainer} {
    @media ${props => props.theme.mediaQueries.smUp} {
      width: 418px;
    }
  }

  ${Items} {
    margin-top: ${({ theme }) => theme.spacing(3)}px;
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

  ${ButtonContainerModal} {
    padding-top: ${({ theme }) => theme.spacing(3)}px;
    button {
      width: auto;
    }
  }
`
