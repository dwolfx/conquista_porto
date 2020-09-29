import styled from 'styled-components'

import ButtonCmp from 'components/Button'
import Text from 'components/Text'

export const EmptyStateContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`

export const Button = styled(ButtonCmp)`
  width: 100%;
`

export const FundoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 22px;
  padding: ${({ theme }) => `${theme.spacing(1)}px 0`};
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

export const FooterContainer = styled.div``
