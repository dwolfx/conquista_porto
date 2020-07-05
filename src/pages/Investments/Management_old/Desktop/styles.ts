import styled from 'styled-components'
import { Col, Row } from 'styled-bootstrap-grid'
import ConquistaText from 'components/Text'
import ConquistaButton from 'components/Button'

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

export const ModalText = styled(ConquistaText).attrs(() => ({
  type: 'headline',
  color: 'gray6',
}))``

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ModalButton = styled(ConquistaButton)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`
