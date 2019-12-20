import styled from 'styled-components'
import { Container, Row, Col } from 'styled-bootstrap-grid'

export const GridContainer = styled(Container)``

export const GridRow = styled(Row)`
  border: 1px solid red;

  &&#t1,
  &&#t2,
  &&#t3 {
    border: 1px solid black;
    height: 430px;
    margin: 0;
    margin-bottom: 30px;
  }
`

export const GridCol = styled(Col)`
  #menu {
    transition: all 0.35s ease-in-out;
  }
`
export const Wrapper = styled.div`
  margin: 30px auto;
`
