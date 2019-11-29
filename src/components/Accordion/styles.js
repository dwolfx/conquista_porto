import styled from 'styled-components'

import ArrowIcon from 'assets/icons/arrow-down.svg'
import theme from 'styles/theme'

export const AccordionHeader = styled.div`
  display: flex;
  position: relative;
  padding: 15px 30px;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: calc(50% - 11px);
    right: 30px;
    mask-image: url(${ArrowIcon});
    background-color: ${theme.colors.linkBlue};
    width: 19px;
    height: 22px;
    transition: all ease 0.3s;
  }
`

export const AccordionTitle = styled.h4`
  font-size: 18px;
  font-weight: 300;
`

export const AccordionBody = styled.div`
  padding: 15px 30px;
  padding-bottom: 15px;
`

export const AccordionWrapper = styled.div`
  background-color: #fff;
  max-height: ${props => (props.isOpen ? '5000px' : '54px')};
  transition: all ease-in-out 0.4s;
  overflow: hidden;
  margin-bottom: 30px;

  ${AccordionHeader} {
    &:after {
      transform: ${props => (props.isOpen ? 'rotate(-180deg)' : 'rotate(0)')};
    }
  }
`
