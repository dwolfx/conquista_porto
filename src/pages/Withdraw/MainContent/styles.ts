import styled from 'styled-components'

import CardComponent from 'components/Card'
import DivisorComponent from 'components/Divisor'
import ButtonComponent from 'components/Button'
import ModalNew from 'components/Modal/ModalNew'
import AccordionNew from 'components/AccordionNew'
import {
  AccordionHeaderText,
  AccordionBody,
} from 'components/AccordionNew/styles'
import { ModalContainer } from 'components/Modal/stylesNew'
import TokenCardCmp from 'components/2FA/TokenCard'
import DigitalSignatureCmp from 'components/2FA/DigitalSignature'

export const Accordion = styled(AccordionNew)`
  ${AccordionHeaderText} {
    padding-left: ${({ theme }) => theme.spacing(2)}px;
  }
  ${AccordionBody} {
    padding-bottom: 0;
  }
`

export const ModalStyled = styled(ModalNew)`
  ${ModalContainer} {
    height: 100%;
  }
`

export const Card = styled(CardComponent)`
  height: 100%;
  padding: ${({ theme }) => `${theme.spacing(5)}px ${theme.spacing(5)}px 0`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    border-radius: 0;
    padding: 0;
  }
`

export const Divisor = styled(DivisorComponent)`
  margin: ${({ theme }) => `${theme.spacing(2)}px 0`};

  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin: ${({ theme }) => `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(3)}px`};
  }
`

export const TextContainer = styled.div`
  padding: ${({ theme }) => `${theme.spacing(2)}px`};
`

export const BodyWrapper = styled.div`
  overflow: auto;
  @media ${({ theme }) => theme.mediaQueries.xs} {
    height: calc(100vh - 256px);
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
  width: 100%;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    justify-content: center;
  }
  button:last-of-type {
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Button = styled(ButtonComponent)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const MessageContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;

  p:first-of-type {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const MessageContent = styled.div`
  display: flex;
`

export const MessageIconContainer = styled.div`
  margin-right: ${({ theme }) => theme.spacing(3)}px;
`

export const TokenCard = styled(TokenCardCmp)`
  padding: ${({ theme }) => `${theme.spacing(5)}px ${theme.spacing(5)}px 0`};
`

export const DigitalSignature = styled(DigitalSignatureCmp)`
  padding: ${({ theme }) => `${theme.spacing(5)}px ${theme.spacing(5)}px 0`};
`
