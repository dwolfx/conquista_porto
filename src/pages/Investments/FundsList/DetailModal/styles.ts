import styled from 'styled-components'

import { ChildrenWrapper, Divisor } from 'components/Modal/stylesNew'
import {
  AccordionCloseButton,
  AccordionBody,
} from 'components/AccordionNew/styles'

import ModalComponent from 'components/Modal/ModalNew'
import AccordionNewComponent from 'components/AccordionNew'
import Button from 'components/Button'
import IconExporter from 'components/IconExporter'
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

export const ButtonSubmit = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  width: 100%;
  min-height: ${({ theme }) => theme.spacing(5)}px;
`

export const ButtonTryAgain = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

export const EmptyStateWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin: auto;
  padding: ${({ theme }) => theme.spacing(5)}px;
`

export const HeaderTitle = styled(TextComponent).attrs(() => ({
  type: 'title',
  bold: true,
}))`
  margin: ${({ theme }) => theme.spacing(2)}px;
`

export const LockFundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 11px;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

export const LockIcon = styled(IconExporter).attrs(() => ({ name: 'lock2' }))`
  fill: ${props => props.theme.colors.gray6};
  height: ${({ theme }) => theme.spacing(3)}px;
  width: ${({ theme }) => theme.spacing(3)}px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`
