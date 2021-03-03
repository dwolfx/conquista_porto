import styled from 'styled-components'
import Text from 'components/Text'

export const FirstColumnCellWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 236px;
  min-height: 56px;
`

export const FirstColumnCellText = styled(Text)`
  width: 236px;
  white-space: pre-wrap;
`

export const CellWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 236px;
  height: 56px;
  display: flex;
`

export const CellText = styled(Text)`
  width: 250px;
  text-align: center;
  white-space: pre-wrap;
`
