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
  color: ${props => props.theme.colors.gray6};
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  padding-bottom: 15px;
`
export const TableWrapper = styled.div`
  display: flex;
  overflow: auto;
  padding: 0 3px;
  width: 100%;
  @media (max-width: 900px) {
    display: block;
  }
  @media (max-width: 767px) {
    display: flex;
    padding: 0 15px;
  }
  @media (max-width: 490px) {
    display: block;
    padding: 0 3px;
  }
`
export const Table = styled.table`
  display: table;
  table-layout: fixed;
  width: 900px;
  height: 100%;
  border-collapse: collapse;
`
export const THead = styled.thead``
export const TBody = styled.tbody`
  tr:nth-child(odd) {
    background-color: ${props => props.theme.colors.gray1};
  }
`
export const Tr = styled.tr`
  background-color: ${props => props.theme.colors.white};
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
  background-color: ${props => props.theme.colors.gray4};
  padding: 20px;
  border: 1px solid ${props => props.theme.colors.gray3};
  color: ${props => props.theme.colors.gray6};
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
`
export const Td = styled.td`
  display: table-cell;
  padding: 8px;
  border: 1px solid ${props => props.theme.colors.gray4};
  color: ${props => props.theme.colors.gray6};
  text-align: center;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 1px;
  line-height: 14px;
`
