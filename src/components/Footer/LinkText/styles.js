import styled from 'styled-components'

import ComponentText from 'components/Text'

export const BlueText = styled(ComponentText).attrs({
  type: 'body',
  bold: true,
})`
  color: ${props => props.theme.colors.blue4};
  margin: ${props => props.margin};
  text-transform: ${props => props.uppercase && 'uppercase'};
`
