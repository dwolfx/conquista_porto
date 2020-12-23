import styled from 'styled-components'

import DivisorComponent from 'components/Divisor'
import { Tabs, TabList } from 'components/Tab/NewTab'
import Text from 'components/Text'

export const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: center;
`

export const StickyContent = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  width: calc(100% - 56px);
`

export const StyledTabList = styled(TabList)`
  width: calc(100% - 56px);
  position: sticky;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  margin-bottom: 0px;
`

export const PlansData = styled.div`
  padding-top: ${({ theme }) => theme.spacing(12)}px;
`

export const LabelText = styled(Text).attrs(() => ({
  bold: true,
  color: 'gray5',
}))``

export const ValueText = styled(Text).attrs(() => ({
  bold: true,
  color: 'gray6',
}))``

export const Divisor = styled(DivisorComponent)`
  margin: ${({ theme }) => `${theme.spacing(1)}px 0`};
`
