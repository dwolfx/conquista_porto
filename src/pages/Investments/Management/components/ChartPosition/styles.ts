import styled from 'styled-components'

import Card from 'components/Card'
import { CardBody } from 'components/Card/styles'

import HorizontalList from 'components/HorizontalList'
import { StartBlock } from 'components/HorizontalList/styles'

export const ChartCard = styled(Card)`
  height: 359px;
  ${CardBody} {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`

export const HorizontalListPieChartTitle = styled(HorizontalList)`
  padding: 0 ${({ theme }) => theme.spacing(1)}px;
  ${StartBlock} {
    margin: 0;
  }
`

export const PieChartContainer = styled.div`
  height: 300px;
  width: 230px;
`

export const PieItemMargin = styled.div`
  margin: ${({ theme }) => theme.spacing(1)}px;
`

export const EmptyBody = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`
