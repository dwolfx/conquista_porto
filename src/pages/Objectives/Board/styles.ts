import styled from 'styled-components'

import Card from 'components/Card'
import Text from 'components/Text'

export const CardIcon = styled.div``

export const CardWrapper = styled(Card)`
  flex: 1;
  margin: ${props => `0 ${props.theme.spacing(1)}px ${props.theme.spacing(5)}px`};
  padding: ${props => `${props.theme.spacing(3)}px`};
  text-align: center;
`

export const CardTitle = styled(Text).attrs(() => ({ type: 'headline' }))`
  margin: ${props => `${props.theme.spacing(3)}px 0`};
`
