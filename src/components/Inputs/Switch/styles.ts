import styled from 'styled-components'

export const Label = styled.label`
  margin-right: 70px;
  color: ${props => props.theme.colors.gray5};
  font-weight: normal;
  line-height: 19px;
  font-size: 14px;
  vertical-align: top;
`

export const CustomControl = styled.div`
  position: relative;
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5rem;
`

export const SwitchLabel = styled.label`
  color: ${props => props.theme.colors.gray5};
  font-weight: normal;
  line-height: 19px;
  font-size: 14px;
  display: inline-block;
  position: relative;
  margin-bottom: 0;
  vertical-align: top;

  &:before {
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: '';
    background-color: ${props => props.theme.colors.blue4};
    box-shadow: 0 0 1px 0 ${props => props.theme.colors.blue4} inset,
      0 0 1px 0 ${props => props.theme.colors.blue4};
    border: ${props => props.theme.colors.blue4} solid 1px;
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  &:after {
    position: absolute;
    top: 0.25rem;
    left: -1rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: '';
    background: ${props => props.theme.colors.white};
  }
`

export const SwitchContainer = styled.div`
  ${SwitchLabel} {
    &:before {
      content: '';
      top: 0;
      left: -56px;
      width: 42px;
      height: 21px;
      pointer-events: all;
      border-color: ${props => props.theme.colors.blue4};
      border-radius: 21px;
    }

    &:after {
      content: '';
      top: 2px;
      left: -54px;
      width: 1rem;
      height: 1rem;
      background-color: ${props => props.theme.colors.white};
      border-radius: 0.5rem;
      transition: background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
        -webkit-transform 0.15s ease-in-out;
      transition: transform 0.15s ease-in-out,
        background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
      transition: transform 0.15s ease-in-out,
        background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;
    }
  }
`
export const SwitchInput = styled.input.attrs(() => ({ type: 'checkbox' }))`
  box-sizing: border-box;
  padding: 0;
  position: absolute;
  left: 0;
  z-index: -1;
  width: 1rem;
  height: 1.25rem;
  opacity: 0;
  box-sizing: border-box;
  padding: 0;

  &:disabled ~ ${SwitchLabel} {
    &::before {
      color: ${props => props.theme.colors.gray3};
      border-color: ${props => props.theme.colors.gray3};
      background-color: ${props => props.theme.colors.gray3};
      box-shadow: 0 0 1px 0 ${props => props.theme.colors.gray3} inset,
        0 0 1px 0 ${props => props.theme.colors.gray3};
    }
    &::after {
      background-color: ${props => props.theme.colors.gray1};
    }
  }

  &:checked ~ ${SwitchLabel} {
    &::before {
      color: ${props => props.theme.colors.white};
      border-color: ${props => props.theme.colors.blue4};
      background-color: ${props => props.theme.colors.blue4};
    }
    &::after {
      background-color: ${props => props.theme.colors.white};
      -webkit-transform: translateX(1.35rem);
      transform: translateX(1.35rem);
    }
  }
`
