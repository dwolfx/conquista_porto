import styled from 'styled-components'

export const TextStyle = styled.p`
  color: ${props => props.theme.colors[props.color]};
  ${props =>
    // if props.type not found in theme settings, get body as default
    props.theme.fontTypes[props.type] || props.theme.fontTypes.body}
`
