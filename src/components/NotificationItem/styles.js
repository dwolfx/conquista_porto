import styled from 'styled-components'

import ConquistaIcon from 'components/IconExporter'
import ComponentText from 'components/Text'

export const Notification = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  background-color: ${props =>
    props.isRead ? props.theme.colors.gray2 : props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.gray4};
  cursor: pointer;
`
export const IdentificationIcon = styled.div`
  display: flex;
  width: 35px;
  height: auto;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
`
export const ActionIcon = styled.div`
  display: flex;
  width: 35px;
  height: auto;
  justify-content: center;
  align-items: center;
  align-self: center;
  cursor: pointer;
`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 5px;
  cursor: pointer;
`
export const Title = styled(ComponentText)`
  color: ${props => props.theme.colors.blue4};
  text-transform: uppercase;
  cursor: pointer;
`
export const Message = styled(ComponentText)`
  color: ${props => props.theme.colors.gray6};
  text-align: left;
  cursor: pointer;
`
export const Icon = styled(ConquistaIcon)`
  fill: ${props => props.theme.colors.blue4};
  height: ${props => (props.name === 'arrowright' ? '16px' : '20px')};
  width: ${props => (props.name === 'arrowright' ? '16px' : '20px')};
`
