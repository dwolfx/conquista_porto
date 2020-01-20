import styled from 'styled-components'

import ArrowIcon from 'assets/icons/arrow-down.svg'

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
    background-color: ${props => props.theme.colors.blue4};
    width: 19px;
    height: 22px;
    transition: all ease 0.3s;
  }
`

export const AccordionBody = styled.div`
  padding: 15px 30px;
  padding-bottom: 15px;
`

export const AccordionWrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
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
