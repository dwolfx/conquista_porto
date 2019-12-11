import styled from 'styled-components'

import ArrowDown from 'assets/icons/arrow-down.svg'
import theme from 'styles/theme'

export const SelectFieldWrapper = styled.div`
  position: relative;
  width: 100%;

  &:before {
    content: '';
    background-color: ${theme.colors.secondary.light};
    border-radius: 50%;
    display: block;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    right: 0;
    width: 20px;
    z-index: 1;
  }
  &:after {
    content: '';
    width: 12px;
    height: 12px;
    mask-image: url(${ArrowDown});
    background-color: yellow;
    position: absolute;
    display: block;
    top: calc(50% - 5px);
    right: 4px;
    z-index: 1;
    background-repeat: no-repeat;
  }
`
export const SelectField = styled.select`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #d2d2d2;
  cursor: pointer;
  height: 42px;
  padding-left: 0;
  position: relative;
  width: 100%;
`

export const SelectLabel = styled.label`
  position: absolute;
  transition: all ease 0.3s;
  z-index: 0;
  top: -13px;
  font-size: 12px;
`

export const SelectWrapper = styled.div`
  display: flex;
  padding-left: ${props => `${props.paddingLeft}px`};
  padding-right: ${props => `${props.paddingRight}px`};
  position: relative;
  width: ${props => `${props.width}%`};

  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0;
    margin: 15px 0;
    width: 100%;
  }
`
