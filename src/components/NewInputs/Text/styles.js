import styled from 'styled-components'

export const InputText = styled.input`
  background-color: transparent;
  border: none;
  font-family: ${props => props.theme.fontTypes.headline};
  height: 48px;
  padding: 10px 0;
  width: ${props => `${props.width}%`};
`
