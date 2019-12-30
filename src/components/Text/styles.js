import styled from 'styled-components'

export const TextStyle = styled.p`
  font-weight: ${props => (props.bold ? 'normal' : '300')};
  ${props =>
    // if props.type not found in theme settings, get body as default
    props.theme.fontTypes[props.type] || props.theme.fontTypes.body}
`
