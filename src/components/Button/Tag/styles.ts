import styled from 'styled-components'
import { themeColors } from 'styles/theme'

const handleColor = (type: string, disabled?: boolean) => {
  switch (type) {
    case 'primary':
      return themeColors.blue4
    case 'secondary':
      return themeColors.green4
    default:
      return themeColors.gray4
  }
}

const handleBorderColor = (type: string) => {
  switch (type) {
    case 'primary':
      return themeColors.blue4
    case 'secondary':
      return themeColors.green4
    default:
      return themeColors.gray3
  }
}

export interface IButtonProps {
  color: 'primary' | 'secondary' | ''
  disabled?: boolean
  onClick?: () => void
}

export const Button = styled.button<IButtonProps>`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid;
  border-color: ${props => handleBorderColor(props.color)};
  border-radius: 4px;
  color: ${props => handleColor(props.color, props.disabled)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  height: 28px;
  justify-content: center;
  padding-left: 14px;
  padding-right: 14px;
  ${props => props.theme.fontTypes.button};
`
