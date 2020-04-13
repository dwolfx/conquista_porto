import styled from 'styled-components'
import { Container, Row, Col } from 'styled-bootstrap-grid'

export const GridContainer = styled(Container)`
  background-color: ${props => props.theme.colors.gray1};
  flex: 1 0 auto;
  padding: 0px;
`
export const TableContent = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 4px;
  width: 100%;
  padding: 21px;
  margin-top: 14px;
  height: auto;
`

export const ContentWrapper = styled(Row)``

export const DropdownWrapper = styled(Col)`
  z-index: 1;
`
