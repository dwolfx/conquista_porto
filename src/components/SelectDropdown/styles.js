import styled from 'styled-components'
import ArrowDown from 'assets/icons/arrow-down.svg'

export const DropdownWrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  cursor: pointer;
  font-size: ${props => props.theme.fontTypes.caption};
  height: 39px;

  * {
    cursor: pointer;
  }

  &:before {
    content: '';
    background-color: ${props => props.theme.colors.blue4};
    border-radius: 50%;
    display: block;
    height: 20px;
    position: absolute;
    top: 26px;
    right: 14px;
    width: 20px;
    z-index: 1;
  }
  &:after {
    content: '';
    width: 12px;
    height: 12px;
    mask-image: url(${ArrowDown});
    position: absolute;
    display: block;
    top: 31px;
    right: 18px;
    z-index: 1;
    background-repeat: no-repeat;
    ${props => (props.isOpen ? 'transform: rotate(180deg);' : '')}
  }
`

export const Label = styled.label`
  line-height: 39px;
  margin-left: 7px;
`

export const OptionsWrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray3};
  ${props => (props.isOpen ? `display: block;` : `display: none;`)}
`

export const Option = styled.div`
  padding: 10px 7px;

  &:hover {
    background-color: ${props => props.theme.colors.gray1};
  }
`
