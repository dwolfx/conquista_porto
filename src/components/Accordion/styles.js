import styled from 'styled-components'

import Text from 'components/Text'

import ArrowIcon from 'assets/icons/arrow-down.svg'

export const AccordionHeader = styled.div`
  display: flex;
  position: relative;
  padding: ${props => (props.padding ? props.padding : '15px 30px')};
  cursor: pointer;
  flex-direction: column;

  &:after {
    content: '';
    transform-origin: center;
    display: block;
    position: absolute;
    top: calc(50% - 10.5px);
    right: 30px;
    mask-image: url(${ArrowIcon});
    background-color: ${props =>
      props.isGrayArrow ? props.theme.colors.gray5 : props.theme.colors.blue4};
    width: 21px;
    height: 21px;
    transition: all ease 0.3s;
  }
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
  padding: ${props => (props.noBodyPadding ? '0px' : '15px 30px')};
  padding-bottom: 15px;
  display: ${props => !props.isOpen && 'none'};
`

export const AccordionWrapper = styled.div`
  background-color: ${props =>
    props.noBackground ? 'transparent' : props.theme.colors.white};
  max-height: ${props => (props.isOpen ? '5000px' : '84px')};
  transition: all ease-in-out 0.4s;
  overflow: hidden;
  margin-bottom: ${props => props.padding};

  ${AccordionHeader} {
    &:after {
      transform: ${props => (props.isOpen ? 'rotate(-180deg)' : 'rotate(0)')};
    }
  }
`
