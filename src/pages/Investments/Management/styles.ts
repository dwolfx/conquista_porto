import styled from 'styled-components'
import { Container } from 'styled-bootstrap-grid'

export interface IModalProps {
  isOpen: boolean
  title: string
  description: string
  button: IButton
}

interface IButton {
  dataGtmName: string
  dataGtmType: string
  dataGtmClicktype: string
  handleClick: any
  buttonName: string
}

export const GridContainer = styled(Container)`
  background-color: ${props => props.theme.colors.gray1};
  flex: 1 0 auto;
  padding: 0px;
`
