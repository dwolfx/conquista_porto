import styled from 'styled-components'
import DivisorComponent from 'components/Divisor'

export const ContentWrapper = styled.div``

export const GrayLine = styled(DivisorComponent).attrs(() => ({
  customSize: 'auto',
}))`
  margin: 0;
`
