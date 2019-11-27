import styled from 'styled-components'

import breakpoints from 'styles/breakpoints'
import theme from 'styles/theme'

export const InputLabel = styled.label`
  position: absolute;
  transition: all ease 0.3s;
  z-index: 0;
`

export const InputText = styled.input`
  border: none;
  border-bottom: 1px solid;
  height: 42px;
  padding: 10px 0;
  position: relative;
  width: 100%;
  z-index: 1;
`

export const InputWrapper = styled.div`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'text')};
  display: flex;
  position: relative;
  margin-right: ${props => (props.marginRight ? `${props.marginRight}px` : 0)};
  margin-left: ${props => (props.marginLeft ? `${props.marginLeft}px` : 0)};
  padding-right: ${props =>
    props.paddingRight ? `${props.paddingRight}px` : 0};
  padding-left: ${props => (props.paddingLeft ? `${props.paddingLeft}px` : 0)};
  pointer-events: ${props => (props.disabled ? 'none' : 'normal')};
  width: ${props => (props.width ? `${props.width}%` : '100%')};

  @media ${breakpoints.mobile} {
    width: 100%;
    padding: 0;
    margin: 15px 0;
  }
  ${InputLabel} {
    color: ${props => (props.disabled ? '#a2a2a2' : '#000')};
    font-size: ${props => (props.active ? '12px' : '14px')};
    font-style: ${props => (props.disabled ? 'italic' : 'normal')};
    top: ${props => (props.active ? '-13px' : '9px')};
  }

  ${InputText} {
    background-color: ${props =>
      props.disabled ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
    border-color: ${props => {
      if (props.error) {
        return '#D0011B'
      }
      if (props.active) {
        return theme.colors.lightPrimary
      }

      return '#D2D2D2'
    }};
  }
`
