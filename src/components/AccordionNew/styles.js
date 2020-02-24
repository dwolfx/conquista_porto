import styled from 'styled-components'

import IconButton from 'components/Button/Icon'
import Text from 'components/Text'

export const AccordionHeader = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  flex-direction: column;
  padding-right: 42px;
`

export const AccordionHeaderLabel = styled.div`
  color: ${props => props.theme.colors.gray5};
  font-family: ${props => props.theme.fontTypes.captionUppercase};
`

export const AccordionHeaderText = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
}))``

export const AccordionBody = styled.div`
  overflow-x: hidden;
  padding: ${props => (props.bodyPadding ? props.bodyPadding : '28px 0px')};
  transition: all ease 0.6s;
`

export const AccordionCloseButton = styled(IconButton).attrs(() => ({
  icon: 'arrowdown',
  color: 'secondary',
  size: 'large',
}))`
  cursor: pointer;
  position: absolute;
  top: calc(50% - 14px);
  right: -14px;
  transition: all ease 0.6s;

  svg {
    width: 28px;
  }
`

export const AccordionWrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  overflow: hidden;
  padding: 28px 14px;
  transition: all ease-in-out 0.6s;

  ${AccordionCloseButton} {
    transform: ${props => (props.isOpen ? 'rotate(-180deg)' : 'rotate(0)')};
  }
  ${AccordionBody} {
    padding: ${props => (props.isOpen ? '35px 0 7px' : 0)};
    max-height: ${props => (props.isOpen ? '1000px' : 0)};
    overflow-y: ${props => (props.isOpen ? 'auto' : 'hidden')};
  }
`
