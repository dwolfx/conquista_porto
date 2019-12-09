import styled, { css } from 'styled-components'

import ArrowIcon from 'assets/icons/arrow-down.svg'

const orangeArrow = css`
  &:after {
    content: '';
    width: 12px;
    height: 12px;
    mask-image: url(${ArrowIcon});
    background-color: yellow;
    position: absolute;
    display: block;
    top: calc(50% - 6px);
    right: 14px;
    z-index: 1;
    background-repeat: no-repeat;
  }
`

const blueArrow = css`
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: calc(50% - 11px);
    right: 30px;
    mask-image: url(${ArrowIcon});
    background-color: ${props => props.theme.colors.primary.light};
    width: 19px;
    height: 22px;
    transition: all ease 0.3s;
  }
`

export const AccordionHeader = styled.div`
  display: flex;
  position: relative;
  padding: 15px 30px;
  cursor: pointer;

  &:before {
    content: '';
    display: ${props => (props.isOrangeArrow ? 'block' : 'none')};
    background-color: ${props => props.theme.colors.secondary.light};
    border-radius: 50%;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    right: 10px;
    width: 20px;
    z-index: 1;
  }

  ${props => (props.isOrangeArrow ? orangeArrow : blueArrow)};
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
