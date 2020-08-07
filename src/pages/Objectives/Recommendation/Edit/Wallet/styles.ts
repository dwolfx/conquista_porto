import styled from 'styled-components'

import MoneyInputCmp from 'components/Inputs/Money'
import TableComp from 'components/Table'
import Text from 'components/Text'

export const Table = styled(TableComp)``

export const FundoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 22px;
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}px`};
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

export const MoneyInput = styled(MoneyInputCmp)`
  height: 35px;
  ${({ theme }) => theme.fontTypes.body};
`
