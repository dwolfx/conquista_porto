import styled from 'styled-components'

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
  margin-right: ${props => `${props.marginRight}px`};
  margin-left: ${props => `${props.marginLeft}px`};
  padding-right: ${props => `${props.paddingRight}px`};
  padding-left: ${props => `${props.paddingLeft}px`};
  pointer-events: ${props => (props.disabled ? 'none' : 'normal')};
  width: ${props => `${props.width}%`};

  @media ${props => props.theme.mediaQueries.xs} {
    width: 100%;
    padding: 0;
    margin: 15px 0;
  }
  ${InputLabel} {
    color: ${props =>
      props.disabled ? props.theme.colors.gray4 : props.theme.colors.black};
    font-size: ${props => (props.active ? '12px' : '14px')};
    font-style: ${props => (props.disabled ? 'italic' : 'normal')};
    top: ${props => (props.active ? '-13px' : '9px')};
  }

  ${InputText} {
    background-color: ${props =>
      props.disabled ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
    border-color: ${props => {
      if (props.error) {
        return props.theme.colors.magenta2
      }
      if (props.active) {
        return props.theme.colors.blue4
      }

      return props.theme.colors.gray3
    }};
  }
`
