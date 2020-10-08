import styled from 'styled-components'
import TableComp from 'components/Table'
import Text from 'components/Text'

interface IProps {
  hasError: boolean
}

export const Table = styled(TableComp)`
  height: calc(100% - 77px);
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

export const TableWrapper = styled.div<IProps>`
  border: ${({ theme, hasError }) => hasError && `1px solid ${theme.colors.gray3}`};
  border-radius: ${({ hasError }) => hasError && '6px'};
  height: 100%;

  > div {
    height: 100%;
  }
`
