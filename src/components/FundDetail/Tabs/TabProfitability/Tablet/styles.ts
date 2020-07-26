import styled from 'styled-components'
import { Col, Row } from 'styled-bootstrap-grid'

export const ColStyled = styled(Col)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const RowTitle = styled(Row)`
  margin: ${({ theme }) => theme.spacing(2)}px -${({ theme }) => theme.spacing(1)}px;
`