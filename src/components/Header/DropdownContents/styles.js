import styled from 'styled-components'

import ConquistaIcon from 'components/IconExporter'
import TextComponent from 'components/Text'
import ButtonComponent from 'components/Button'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
  height: 300px;
`

export const Content = styled.div`
  width: 100%;
  flex: 1;
  overflow: auto;
`

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 14px;
  border-top: 1px solid ${props => props.theme.colors.gray2};
`

export const ItemWrapper = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: ${props => props.padding};
  border-bottom: 1px solid ${props => props.theme.colors.gray2};

  &&:hover {
    background-color: ${props => props.theme.colors.gray1};
  }
`

export const ItemHeader = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 7px;
`
export const ItemContent = styled.div`
  width: 100%;
  display: flex;
`

export const ItemIcon = styled(ConquistaIcon).attrs(props => ({
  name: props.name,
}))`
  width: 21px;
  height: 21px;
  fill: ${props => props.theme.colors[props.color]};
`

export const ItemText = styled(TextComponent).attrs(props => ({
  type: props.name,
}))`
  fill: ${props => props.theme.colors[props.color]};
  margin: ${props => props.margin};
`
export const Button = styled(ButtonComponent)`
  width: 100%;
`

export const NotFoundContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
