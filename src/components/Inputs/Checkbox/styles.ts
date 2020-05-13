import styled from 'styled-components'

export const Label = styled.label``
export const Input = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  z-index: -1;
  opacity: 0;

  + ${Label} {
    position: relative;
    cursor: pointer;
    padding-left: 30px;

    &:before {
      content: '';
      position: absolute;
      width: 19px;
      height: 19px;
      left: 0;
      bottom: 0;
      border: 1px solid ${props => props.theme.colors.gray4};
      box-sizing: border-box;
      border-radius: 4px;
    }
  }

  &:checked + ${Label}:before {
    border: 1px solid ${props => props.theme.colors.blue4};
  }

  &:checked + ${Label}:after {
    content: '';
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 12px;
    border-right: solid 3px ${props => props.theme.colors.blue4};
    border-bottom: solid 3px ${props => props.theme.colors.blue4};
    transform: rotate(45deg);
  }

  &:disabled + ${Label}:before {
    border: 1px solid ${props => props.theme.colors.gray4};
    cursor: not-allowed;
  }

  &:disabled + ${Label}:after {
    cursor: not-allowed;
    border-right: solid 3px ${props => props.theme.colors.gray4};
    border-bottom: solid 3px ${props => props.theme.colors.gray4};
    transform: rotate(45deg);
  }
`
