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
  size: 'small',
}))`
  cursor: pointer;
  height: 28px;
  position: absolute;
  top: calc(50% - 14px);
  right: 0;
  transition: all ease 0.6s;
`

export const AccordionWrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  overflow: hidden;
  padding: 28px 7px;
  transition: all ease-in-out 0.6s;

  ${AccordionCloseButton} {
    transform: ${props => (props.isOpen ? 'rotate(-180deg)' : 'rotate(0)')};
  }
  ${AccordionBody} {
    padding: ${props => {
      if (!props.isOpen) {
        return 0
      }
      return props.bodyPadding ? props.bodyPadding : '28px 0px'
    }};
    max-height: ${props => (props.isOpen ? '1500px' : 0)};
    overflow-y: ${props => (props.isOpen ? 'auto' : 'hidden')};
  }
`
