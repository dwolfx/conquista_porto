import styled from 'styled-components'

import ArrowIcon from 'assets/icons/arrow-down2.svg'

export const AccordionHeader = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  flex-direction: column;
  padding-right: 42px;

  &:after {
    content: '';
    justify-content: center;
    transform-origin: center;
    display: block;
    position: absolute;
    top: calc(50% - 14px);
    right: 0;
    background: url(${ArrowIcon}) no-repeat center center
      ${props => props.theme.colors.gray2};
    border-radius: 50%;
    width: 28px;
    height: 28px;
    transition: all ease 1s;
  }
`

export const AccordionHeaderLabel = styled.div`
  color: ${props => props.theme.colors.gray5};
  font-family: ${props => props.theme.fontTypes.captionUppercase};
`

export const AccordionHeaderText = styled.div``

export const AccordionBody = styled.div`
  padding: ${props => (props.bodyPadding ? props.bodyPadding : '28px 0px')};
  display: ${props => !props.isOpen && 'none'};
`

export const AccordionWrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  max-height: ${props => (props.isOpen ? '1000px' : '84px')};
  overflow: hidden;
  padding: 20px 30px;
  margin-bottom: 30px;
  transition: all ease-in-out 1s;

  ${AccordionHeader} {
    &:after {
      transform: ${props => (props.isOpen ? 'rotate(-180deg)' : 'rotate(0)')};
    }
  }
`
