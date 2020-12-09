import styled from 'styled-components'

import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import CardComponent from 'components/Card'
import VerticalListComp from 'components/VerticalList'
import DivisorComp from 'components/Divisor'
import Text from 'components/Text'

export const VerticalList = styled(VerticalListComp)`
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
`

export const ProposalCard = styled(CardComponent)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  height: auto;
`

export const FlexContainer = styled.div`
  display: flex;
`

export const ProposalHorizontalCardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `11px ${theme.spacing(2)}px`};
`

export const ProposalCoverageList = styled.div`
  width: 100%;
  margin: ${({ theme }) => `25px ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(5)}px`}
`

export const ProposalCardHeader = styled.div`
  padding: ${({ theme }) => `11px ${theme.spacing(2)}px ${theme.spacing(1)}px`};
`

export const SelectPlanButton = styled(Button)<{ horizontal?: boolean }>`
  margin: ${({ theme, horizontal }) => `${theme.spacing(2)}px ${horizontal ? '' : '0' }`};
`

export const TextSubheading = styled(Text).attrs(() => ({
  type: 'subheading',
  color: 'gray5',
  bold: true,
}))`
  margin: ${({ theme }) => `${theme.spacing(3)}px 0`};
`

export const Divisor = styled(DivisorComp)<{ vertical?: boolean }>`
  margin: ${({ theme, vertical }) => vertical ? `11px 0 ${theme.spacing(1)}px` : `${theme.spacing(2)}px 0`};
`

export const DetailsButton = styled(ButtonLink).attrs(() => ({
  noIcon: true,
}))`
  margin: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(2)}px 11px`};
`
