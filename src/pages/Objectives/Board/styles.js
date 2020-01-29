import styled from 'styled-components'

import Card from 'components/Card'
import Text from 'components/Text'

export const CardWrapper = styled(Card)`
  flex: 1;
  margin: 0 7px 35px;
  padding: 30px 20px;
  text-align: center;
`

export const CardTitle = styled(Text).attrs(() => ({ type: 'headline' }))`
  margin: 30px 0;
`

export const IconWrapper = styled.div``
