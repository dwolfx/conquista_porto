import styled from 'styled-components'

import TableComp from 'components/TableNew'
import Text from 'components/Text'

export const ContainerFunds = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  @media ${props => props.theme.mediaQueries.sm} {
    flex-direction: column;
  }
`

export const Table = styled(TableComp)`
  .table {
    max-height: 353px;
    table-layout: auto;
  }
`

export const FundoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 22px;
  padding: 9px 14px 8px 20px;
  width: 100%;
`

export const FundoOutterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const FundoNameWrapper = styled(Text)`
  text-align: left;
  max-width: 220px;
  font-weight: normal;
  white-space: pre-wrap;
`
