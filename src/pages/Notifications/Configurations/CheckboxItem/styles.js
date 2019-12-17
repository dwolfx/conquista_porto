import styled from 'styled-components'

export const Label = styled.label`
  display: block;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 8px 35px;
  cursor: pointer;
  & input:checked ~ span:after {
    display: block;
  }
  & span:after {
    left: 7px;
    top: 3px;
    width: 6px;
    height: 11px;
    border: solid ${props => props.theme.colors.blue4};
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`
export const Input = styled.input`
  position: absolute;
  height: 0;
  width: 0;
  opacity: 0;
`
export const CheckMark = styled.span`
  background-color: ${props => props.theme.colors.white};
  width: 20px;
  height: 20px;
  position: absolute;
  top: 8px;
  left: 5px;
  border: 1px solid ${props => props.theme.colors.gray4};
  border-radius: 3px;
  &:after {
    content: '';
    position: absolute;
    display: none;
  }
`
