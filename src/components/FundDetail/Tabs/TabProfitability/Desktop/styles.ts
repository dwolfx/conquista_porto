import styled from 'styled-components'

export const TablesContainer = styled.div`
  vertical-align: middle;
  display: flex;
  border: 1px solid ${props => props.theme.colors.gray3};
  border-radius: 4px;
  position: relative;
  margin: ${({ theme }) => theme.spacing(2)}px 0;
`
export const FixedTable = styled.table`
  table-layout: fixed;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  border-collapse: collapse;

  thead tr {
    border-right: none;
  }
`

export const ContentTable = styled.table`
  display: block;
  border-collapse: collapse;
  overflow-x: scroll;
  table-layout: fixed;

  thead > tr {
    border-right: none;
  }

  tbody > tr {
    border-right: none;
  }
`

export const Thead = styled.thead`
  background-color: ${props => props.theme.colors.gray1};

  > tr {
    border-top: none;
  }
`

export const Tr = styled.tr`
  border: 1px solid ${props => props.theme.colors.gray3};
  border-left: none;
`

export const Th = styled.th`
  padding: 20px 28px 21px 28px;
  background-color: ${props => props.theme.colors.gray1};
  width: 100px;
  white-space: nowrap;
  font-weight: 600;
`

export const Td = styled.td`
  text-align: center;

  &:last-child {
    border-right: none;
  }
`
