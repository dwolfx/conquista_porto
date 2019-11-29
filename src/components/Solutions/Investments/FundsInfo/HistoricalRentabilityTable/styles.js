import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  padding-bottom: 30px;
`
export const Title = styled.h5`
  color: #1c1c1c;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  padding-bottom: 15px;
`
export const TableWrapper = styled.div`
  overflow: auto;
  width: 100%;
`
export const Table = styled.table`
  display: table;
  table-layout: fixed;
  width: 894px;
  border-collapse: collapse;
`
export const THead = styled.thead``
export const TBody = styled.tbody`
  tr:nth-child(odd) {
    background-color: #f6f5f6;
  }
`
export const Tr = styled.tr`
  background-color: #fff;
  td:nth-child(1) {
    font-size: 14px;
    font-weight: 300;
    line-height: 24px;
    text-transform: uppercase;
    letter-spacing: normal;
  }
`
export const Th = styled.th`
  display: table-cell;
  background-color: #c0bfc0;
  padding: 20px;
  border: 1px solid #d2d2d2;
  color: #1c1c1c;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
`
export const Td = styled.td`
  display: table-cell;
  padding: 8px;
  border: 1px solid #c0bfc0;
  color: #1c1c1c;
  text-align: center;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 1px;
  line-height: 14px;
`
