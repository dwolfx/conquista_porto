import styled from 'styled-components'

const handleColor = (type, themeColors, disabled) => {
  switch (type) {
    case 'primary':
      return themeColors.blue4
    case 'secondary':
      return themeColors.green4
    default:
      return disabled ? themeColors.gray3 : themeColors.gray5
  }
}

const handleBorderColor = (type, themeColors) => {
  switch (type) {
    case 'primary':
      return themeColors.blue4
    case 'secondary':
      return themeColors.green4
    default:
      return themeColors.gray3
  }
}

export const Button = styled.button`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid;
  border-color: ${props => handleBorderColor(props.color, props.theme.colors)};
  border-radius: 4px;
  color: ${props =>
    handleColor(props.color, props.theme.colors, props.disabled)};
  cursor: pointer;
  display: flex;
  height: 28px;
  justify-content: center;
  padding-left: 14px;
  padding-right: 14px;
  ${props => props.theme.fontTypes.button};
`
