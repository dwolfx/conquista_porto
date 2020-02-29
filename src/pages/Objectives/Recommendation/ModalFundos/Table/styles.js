import styled, { css } from 'styled-components'

const defaultStyle = css`
  border: 1px solid ${props => props.theme.colors.gray2};
  font-family: ${props => props.theme.fontTypes.captionUppercase};
  text-align: center;
`

export const TableWrapper = styled.div``

export const Table = styled.table`
  display: table;
  table-layout: fixed;
  width: 100%;
  height: 100%;
  border-collapse: collapse;
`
export const THead = styled.thead`
  tr {
    background-color: ${props => props.theme.colors.gray2};
  }
`

export const TBody = styled.tbody`
  tr {
    &:nth-child(even) {
      background-color: ${props => props.theme.colors.gray1};
    }
  }
`

export const Tr = styled.tr``

export const Td = styled.td`
  ${defaultStyle};
  padding: 14px 15px;

  &:first-child {
    text-align: left;
  }
`

export const Th = styled.th`
  ${defaultStyle};
  padding: 18px 5px;
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 7px 0;
`
