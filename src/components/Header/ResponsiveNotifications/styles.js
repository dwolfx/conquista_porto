import styled from 'styled-components'

import { Container, Col, Row } from 'styled-bootstrap-grid'
import ConquistaIcon from 'components/IconExporter'

export const GridContainer = styled(Container)`
  @media ${props => props.theme.mediaQueries.md} {
    max-width: unset;
  }
`
export const GridCol = styled(Col)``
export const GridRow = styled(Row)`
  .footer {
    margin-top: auto;
  }
  .overflowContent {
    overflow: auto;
  }
  .closeButton {
    justify-content: flex-end;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 85px;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-top: 1px solid ${props => props.theme.colors.gray4};
`
export const CloseIcon = styled(ConquistaIcon).attrs(() => ({ name: 'close' }))`
  fill: ${props => props.theme.colors.gray5};
  width: 24px;
  height: 24px;
`
export const CloseIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`
export const NotificationsMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const ResponsiveContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  transition: transform 0.3s ease-out;
  transform: ${props => (props.isOpen ? 'translateY(0%)' : 'translateY(150%)')};
  position: fixed;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow: auto;
  z-index: 3;
  top: 0;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
`
