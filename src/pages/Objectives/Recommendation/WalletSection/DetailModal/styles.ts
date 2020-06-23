import styled from 'styled-components'

import { ChildrenWrapper, Divisor } from 'components/Modal/stylesNew'
import {
  AccordionCloseButton,
  AccordionBody,
} from 'components/AccordionNew/styles'

import ModalComponent from 'components/Modal/ModalNew'
import AccordionNewComponent from 'components/AccordionNew'
import TextComponent from 'components/Text'

export const ModalBodyWrapper = styled.div`
  overflow: auto;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none; /* Safari, Chrome, Firefox, IE */
  }
  scrollbar-width: none; /* Firefox for Android */
`

export const Modal = styled(ModalComponent)`
  ${ChildrenWrapper} {
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  ${Divisor} {
    padding: 0;
    margin: 0;
    width: 100%;
  }
`

export const Accordion = styled(AccordionNewComponent)`
  width: 100%;
  padding: 0;

  ${AccordionCloseButton} {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }

  ${AccordionBody} {
    overflow: hidden;
  }
`

export const HeaderTitle = styled(TextComponent).attrs(() => ({
  type: 'title',
  bold: true,
}))`
  margin: ${({ theme }) => theme.spacing(2)}px;
`
