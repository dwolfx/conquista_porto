import styled from 'styled-components'
import IconButton from 'components/Button/Icon'
import { Col, Row } from 'styled-bootstrap-grid'

export const RowContent = styled(Row)`
  padding: 0 ${({ theme }) => theme.spacing(1)}px;
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
export const FloatButton = styled(IconButton)`
  content: '';
  border-radius: 50%;
  position: fixed;
  bottom: 14px;
  right: 14px;
  z-index: 11;
  border: none;
`
