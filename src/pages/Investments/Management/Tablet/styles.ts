import styled from 'styled-components'
import IconButton from 'components/Button/Icon'
import ConquistaButton from 'components/Button'
import { Col, Row } from 'styled-bootstrap-grid'

export const RowContent = styled(Row)`
  padding: 0 ${({ theme }) => theme.spacing(1)}px;
`

export const LeftContent = styled(Col)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const MainContent = styled(Col)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`

export const FloatButton = styled(IconButton)`
  content: '';
  border-radius: 50%;
  position: fixed;
  bottom: 14px;
  right: 14px;
  z-index: 1;
  border: none;
`

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ModalButton = styled(ConquistaButton)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`
