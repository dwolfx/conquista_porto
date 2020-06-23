import styled from 'styled-components'
import { Col, Row } from 'styled-bootstrap-grid'

import AccordionCmp from 'components/AccordionNew'
import { AccordionHeader } from 'components/AccordionNew/styles'
import Button from 'components/Button'
import Card from 'components/Card'
import DivisorCmp from 'components/Divisor'
import Text from 'components/Text'

export const FullHeightCard = styled(Card)`
  height: 100%;
`

export const CardBody = styled.div`
  height: 100%;
  padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(1)}px`};
`

export const SectionTitleCol = styled(Col)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const FooterButton = styled(Button)`
  width: 100%;
`

export const ValueText = styled(Text)`
  display: flex;

  svg {
    margin-left: ${({ theme }) => theme.spacing(1)}px;
  }
`

export const Divisor = styled(DivisorCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

export const Accordion = styled(AccordionCmp)`
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  width: 100%;

  &::last-of-type {
    margin-bottom: 0;
  }
  ${AccordionHeader} {
    margin-left: ${({ theme }) => theme.spacing(2)}px;
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const AccordionBody = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(2)}px ${({ theme }) => theme.spacing(2)}px;
`

export const VerticalListRow = styled(Row)`
  margin-left: -${({ theme }) => theme.spacing(3)}px;
  margin-right: -${({ theme }) => theme.spacing(3)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
    margin-right: 0;
  }
`

export const VerticalListCol = styled(Col)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    &:not(:last-of-type) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
    }
  }
`
