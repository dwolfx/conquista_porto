import styled from 'styled-components'

import ConquistaIcon from 'components/IconExporter'
import ComponentText from 'components/Text'

export const NotificationWrapper = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.gray6};
  display: flex;
  height: auto;
  justify-content: center;
  left: 0;
  padding: 18px;
  position: fixed;
  top: ${props => (props.isOpen ? '72px' : '0')};
  transition: all ease 1s;
  width: 100%;
  z-index: 10;
`

export const Message = styled(ComponentText)`
  ${props => props.theme.fontTypes.button};
  color: ${props => props.theme.colors.white};
`

export const Icon = styled(ConquistaIcon)`
  height: 20px;
  margin-right: 20px;
  width: 20px;
`

export const Close = styled(Icon)`
  cursor: pointer;
  position: absolute;
  right: 50px;

  ${Icon} {
    margin: 0;
  }
`
