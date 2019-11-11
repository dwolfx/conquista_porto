import styled, { css } from 'styled-components'

import ConquistaIcon from '../../IconExporter'

/* Variáveis dos estilos dos ícones */
const svgStyle = {
  fill: '#fff',
  width: '23px',
  height: '23px',
  'margin-right': '15px'
}
const arrowSvgStyle = {
  fill: '#fff',
  width: '14px',
  height: '14px'
}

/* Variável com as propriedades do atributo disable */
const disable = css`
  svg {
    fill: #a2a2a2;
  }
  p {
    color: #a2a2a2;
  }
`

/* Container Inicial */
export const Container = styled.div`
  /* *****************************
********************************
********************************
********************************
******************************** apagar margin top */
  margin-top: 10px;
  height: auto;
  background-color: #555861;
`

/* Logo da parte superior da página e círculo laranja dos ícones close, 
arrowup e arrowdown */
export const Logo = styled.a`
  background-color: #fff;
  width: 150px;
  height: 60px;
  margin-right: 20px;
  cursor: pointer;
`
export const IconCircle = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ff7433;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

/* Container para os itens do menu */
export const ItemContainer = styled.div`
  ${props => props.disable && disable};
  display: flex;
  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : 'row'};
  width: 100%;
  height: auto;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  align-items: center;
  padding: ${props => (props.padding ? props.padding : '0px')};
  cursor: pointer;
`

/* Wrapper da tag 'Em Breve' */
export const TagWrapper = styled.div`
  display: flex;
  padding: 0px 3px;
  border: 1px solid #a2a2a2;
  border-radius: 3px;
  margin-left: 15px;
`

/* Containers do Dropdown */
export const ContainerDropdown = styled.div`
  max-height: ${props => (props.isOpen ? '1000px' : '0px')};
  transition: all 0.8s linear;
  width: 100%;
  overflow: hidden;
`
export const ItemContainerDropdown = styled.div`
  ${props => props.disable && disable};
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 0px 35px 35px 35px;
  cursor: pointer;
`

/* Estilo dos tipos de texto */
export const WhiteText = styled.p`
  display: flex;
  color: ${props => (props.color ? props.color : '#fff')};
  font-size: ${props => (props.size ? `${props.size}px` : '20px')};
  font-weight: 300;
  text-align: center;
  line-height: 39px;
  cursor: pointer;
`
export const TagText = styled.p`
  display: flex;
  color: ${props => (props.color ? props.color : '#fff')};
  line-height: 15px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
`

/* Estilo dos icones */
export const CloseIcon = styled(ConquistaIcon).attrs({ name: 'close' })`
  fill: #fff;
  width: 24px;
  height: 24px;
`
export const AppsIcon = styled(ConquistaIcon).attrs({ name: 'apps' })`
  ${svgStyle};
`
export const ArrowDownIcon = styled(ConquistaIcon).attrs({ name: 'arrowdown' })`
  ${arrowSvgStyle};
`
export const ArrowUpIcon = styled(ConquistaIcon).attrs({ name: 'arrowup' })`
  ${arrowSvgStyle};
`
export const DiamondIcon = styled(ConquistaIcon).attrs({ name: 'diamond' })`
  ${svgStyle};
`
export const GearIcon = styled(ConquistaIcon).attrs({ name: 'gear' })`
  ${svgStyle};
`
export const HomeIcon = styled(ConquistaIcon).attrs({ name: 'home' })`
  ${svgStyle};
`
export const IdeaIcon = styled(ConquistaIcon).attrs({ name: 'idea' })`
  ${svgStyle};
`
export const TargetIcon = styled(ConquistaIcon).attrs({ name: 'target' })`
  ${svgStyle};
`
