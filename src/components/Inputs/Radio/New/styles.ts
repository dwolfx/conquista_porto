import styled from 'styled-components'

export const RadioInput = styled.input`
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
    border-radius: 50%;
    background-color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.gray4};
  }
  &:after {
    content: '';
    width: 10px;
    height: 10px;
    display: block;
    position: absolute;
    top: calc(50% - 5px);
    left: calc(50% - 5px);
    border-radius: 50%;
    background-color: transparent;
  }
  &:checked {
    &:after {
      background-color: ${props => props.theme.colors.blue4};
    }
  }
`

export const RadioLabel = styled.label<{
  disabled: boolean
}>`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  margin: 8px 16px 8px 0;

  ${({ theme, disabled }) => `
    color: ${disabled ? theme.colors.gray5 : theme.colors.black}};
    pointer-events: ${disabled ? 'none' : 'all'};
  `}

  &:last-of-type {
    margin-right: 0;
  }
`
export const RadioInputWrapper = styled.div`
  display: flex;
  align-items: center;
`
