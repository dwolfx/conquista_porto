import styled from 'styled-components'

import breakpoints from 'styles/breakpoints'

export const RadioTitle = styled.p`
  color: #1c1c1c;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  margin-right: 30px;
  word-break: break-word;
`

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  height: 20px;
  margin-right: 10px;
  position: relative;
  width: 20px;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    top: 0;
    left: 0;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #c7c7c7;
  }
  &:after {
    content: '';
    width: 10px;
    height: 10px;
    display: block;
    position: absolute;
    top: calc(50% - 4px);
    left: calc(50% - 4px);
    border-radius: 50%;
    background-color: transparent;
  }
  &:checked {
    &:after {
      background-color: #30c5ff;
    }
  }
`

export const RadioLabel = styled.label`
  align-items: center;
  color: ${props => (props.disabled ? '#9c9c9c' : '#000')};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-style: ${props => (props.disabled ? 'italic' : 'normal')};
  margin: 8px 16px 8px 0;
  pointer-events: ${props => (props.disabled ? 'none' : 'all')};

  &:last-of-type {
    margin-right: 0;
  }
`

export const RadioWrapper = styled.div`
  align-items: ${props => (props.itemsAlign ? props.itemsAlign : 'center')};
  display: flex;
  flex-direction: ${props =>
    props.itemsDirection ? props.itemsDirection : 'row'};
  padding-left: ${props => (props.paddingLeft ? `${props.paddingLeft}px` : 0)};
  padding-right: ${props =>
    props.paddingRight ? `${props.paddingRight}px` : 0};
  margin-left: ${props => (props.marginLeft ? `${props.marginLeft}px` : 0)};
  margin-right: ${props => (props.marginRight ? `${props.marginRight}px` : 0)};
  width: ${props => (props.width ? `${props.width}%` : 'auto')};

  @media ${breakpoints.mobile} {
    flex-direction: column;
    margin: 15px 0;
  }
`
