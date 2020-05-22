import styled from 'styled-components'
import { Col, Row } from 'styled-bootstrap-grid'

export const TablesContainer = styled.div`
  vertical-align: middle;
  display: flex;
  border: 1px solid ${props => props.theme.colors.gray2};
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
`

export const ContentTable = styled.table`
  display: block;
  border-collapse: collapse;
  overflow-x: scroll;
  table-layout: fixed;
`

export const Thead = styled.thead`
  background-color: ${props => props.theme.colors.gray1};
`

export const Tr = styled.tr`
  border: 1px solid ${props => props.theme.colors.gray2};
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
`

export const ColStyled = styled(Col)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const RowTitle = styled(Row)`
  margin: ${({ theme }) => theme.spacing(2)}px -${({ theme }) => theme.spacing(1)}px;
`

export const ProfitabilityContent = styled.div`
  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0px ${({ theme }) => theme.spacing(2)}px;
  }
`
