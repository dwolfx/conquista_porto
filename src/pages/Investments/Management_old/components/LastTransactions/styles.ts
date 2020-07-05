import styled from 'styled-components'
import Text from 'components/Text'

export const Container = styled.div`
  max-height: 300px;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const TextAccordionHeader = styled(Text).attrs(() => ({
  type: 'heading4',
  color: 'gray6',
  bold: true,
}))`
  padding-left: ${({ theme }) => theme.spacing(2)}px;
`
