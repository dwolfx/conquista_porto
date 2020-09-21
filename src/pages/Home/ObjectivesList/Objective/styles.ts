import styled from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'

import AccordionNewComponent from 'components/AccordionNew'
import DivisorComponent from 'components/Divisor'

import HorizontalList from 'components/HorizontalList'
import { StartBlock } from 'components/HorizontalList/styles'
import VerticalList from 'components/VerticalList'


export const LinearProgressBarContent = styled.div`
  width: 56px;
`

export const HorizontalListTruncateStartBlock = styled(HorizontalList)`
  ${StartBlock} {
    flex: 1;
    min-width: 0;
  }
`

export const VerticalListStyled = styled(VerticalList)`
  padding: ${({ theme }) => theme.spacing(1)}px 0;
`

export const ObjectivePercentageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 112px;
`

export const ObjectivesTableContainer = styled(Row)`
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing(1)}px 0;
`

export const ObjectivesTableBox = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const ObjectivesAccordion = styled(AccordionNewComponent)`
  width: 100%;
  padding: 0px;
  margin: 0px;
`

export const ObjectiveDivisor = styled(DivisorComponent)`
  margin: ${({ theme }) => theme.spacing(2)}px 0;
`