import styled from 'styled-components'
import ConquistaIcon from 'components/IconExporter'

export const Button = styled.button`
  outline: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.gray4};
  ${props => props.theme.fontTypes.button};
`

export const Icon = styled(ConquistaIcon).attrs(props => ({
  name: props.name,
}))`
  width: 21px;
  height: 21px;
  margin-right: 14px;
`
