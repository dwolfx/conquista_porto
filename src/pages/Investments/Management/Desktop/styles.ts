import styled from 'styled-components'
import { Col, Row } from 'styled-bootstrap-grid'

export const RowContent = styled(Row)`
  margin-right: 0;
  margin-left: 0;
`

export const LeftContent = styled(Col)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`

export const MainContent = styled(Col)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`
