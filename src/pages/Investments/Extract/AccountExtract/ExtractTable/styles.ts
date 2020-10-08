import styled from 'styled-components'

import TableComp from 'components/Table'
import Text from 'components/Text'

export const Table = styled(TableComp)`
  height: 100%;
`
export const StyledDate = styled(Text).attrs(({
  type: "body",
  color: "gray5"
}))`
  padding: ${({ theme }) => `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(2)}px`};
`

export const BoldText = styled(Text).attrs(({
  type: "title",
  color: "gray6",
  bold: true,
}))`
  text-transform: capitalize;
`