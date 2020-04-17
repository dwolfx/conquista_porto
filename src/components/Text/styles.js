import styled, { css } from 'styled-components'

const truncate = css`
  width: ${props => props.width && props.width};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TextStyle = styled.p`
  color: ${props => props.theme.colors[props.color]};
  text-align: ${props => props.textAlign};
  font-weight: ${props => (props.bold ? 'normal' : '300')};
  ${props => props.truncate && truncate};
  ${props =>
    // if props.type not found in theme settings, get body as default
    props.theme.fontTypes[props.type] || props.theme.fontTypes.body}
`
