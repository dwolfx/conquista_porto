import styled from 'styled-components'

import AccordionCardCmp from 'components/Card/Accordion'
import { RiskColorTag as RiskColorTagCmp } from 'pages/Objectives/Recommendation/WalletSection/styles'

export const CardBody = styled.div`
  padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(1)}px 0`};
`

export const RiskColorTag = styled(RiskColorTagCmp)``

export const AccordionCard = styled(AccordionCardCmp)`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

export const FundCardHeader = styled.div`
  display: flex;
  flex-direction: column;

  p {
    &:last-of-type {
      margin-top: ${({ theme }) => theme.spacing(1)}px;
    }
  }
`

export const FundCardContent = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

export const ActionMenuOption = styled.div`
  display: flex;
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(3)}px`};

  svg {
    margin-right: ${({ theme }) => theme.spacing(3)}px;
  }
`
