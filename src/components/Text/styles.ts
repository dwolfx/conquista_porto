import styled, { css } from 'styled-components'
import { themeColors, fontTypes } from 'styles/theme'

const truncate = css<any>`
  width: ${props => props.width};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

interface IText {
  color: keyof typeof themeColors
  bold: boolean
  textAlign: 'left' | 'center' | 'right' | 'unset'
  textTransform:
    | 'none'
    | 'capitalize'
    | 'uppercase'
    | 'lowercase'
    | 'full-width'
    | 'full-size-kana'
  type: keyof typeof fontTypes
  truncate?: boolean
}

export const TextStyle = styled.p<IText>`
  color: ${props => props.theme.colors[props.color]};
  text-align: ${props => props.textAlign};
  text-transform: ${props => props.textTransform};
  font-weight: ${props => (props.bold ? 'normal' : '300')};

  ${props => props.truncate && truncate};
  ${props =>
    // if props.type not found in theme settings, get body as default
    props.theme.fontTypes[props.type] || props.theme.fontTypes.body}
`
