import styled from 'styled-components'
import Icon from 'components/IconExporter'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import ConquistaText from 'components/Text'
import ConquistaButton from 'components/Button'
import ConquistaModal from 'components/Modal/ModalNew'
import IconButton from 'components/Button/Icon'

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
  margin-top: ${props => props.theme.spacing(2)}px;
  height: auto;
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

export const ContentWrapper = styled(Row)``

export const DropdownWrapper = styled(Col)`
  z-index: 1;
`

export const StyledIcon = styled(Icon)`
  width: 21px;
  height: 21px;
`

export const Modal = styled(ConquistaModal)`
  z-index: 14;
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
