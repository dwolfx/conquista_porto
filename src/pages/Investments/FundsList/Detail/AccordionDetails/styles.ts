import styled from 'styled-components'
import AccordionNewComponent from 'components/AccordionNew'
import TextComponent from 'components/Text'

export const Accordion = styled(AccordionNewComponent)`
  width: 100%;
  padding: 0;
`

export const HeaderTitle = styled(TextComponent).attrs(() => ({
  type: 'title',
  bold: true,
}))`
  margin: ${({ theme }) => theme.spacing(2)}px;
`
