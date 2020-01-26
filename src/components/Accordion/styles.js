import styled from 'styled-components'

import ArrowIcon from 'assets/icons/arrow-down2.svg'

export const AccordionHeader = styled.div`
  display: flex;
  position: relative;
  padding: ${props => (props.padding ? props.padding : '15px 30px')};
  cursor: pointer;

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

export const AccordionBody = styled.div`
  padding: ${props => (props.noBodyPadding ? '0px' : '15px 30px')};
  padding-bottom: 15px;
`

export const AccordionWrapper = styled.div`
  background-color: ${props =>
    props.noBackground ? 'transparent' : props.theme.colors.white};
  max-height: ${props => (props.isOpen ? '5000px' : '54px')};
  transition: all ease-in-out 0.4s;
  overflow: hidden;
  margin-bottom: ${props => (props.padding ? '0px' : '30px')};

  ${AccordionHeader} {
    &:after {
      transform: ${props => (props.isOpen ? 'rotate(-180deg)' : 'rotate(0)')};
    }
  }
`
