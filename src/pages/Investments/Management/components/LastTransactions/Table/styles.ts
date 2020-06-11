import styled from 'styled-components'

export const TableStyled = styled.table`
  overflow: auto;
  display: inline-block;
  padding-right: ${({ theme }) => `${theme.spacing(2)}px`};

  tbody {
    width: 100%;
    display: inline-table;
  }
`

export const TableRow = styled.tr`
  height: ${({ theme }) => theme.spacing(8)}px;
`
