import styled from 'styled-components'

import TableComp from 'components/Table'
import Text from 'components/Text'

export const Table = styled(TableComp)`
  height: 100%;
`

export const BoldText = styled(Text).attrs(({
  type: "title",
  color: "gray6",
  bold: true,
}))`
  text-transform: capitalize;
`