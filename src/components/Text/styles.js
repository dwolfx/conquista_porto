import styled from 'styled-components'

const fontSizeHandler = type => {
  switch (type) {
    case 'title1':
      return '92px'
    case 'title2':
      return '56px'
    case 'title3':
      return '34px'
    case 'title4':
      return '22px'
    case 'title5':
      return '20px'
    case 'title6':
      return '14px'
    case 'paragraph':
      return '16px'
    case 'subparagraph':
      return '10px'
    case 'button':
      return '11px'
    default:
      return '16px'
  }
}

export const TextStyle = styled.p`
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => fontSizeHandler(props.type)};
  font-weight: ${props => (props.bold ? 'normal' : '300')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
`
