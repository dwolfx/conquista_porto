import styled from 'styled-components'
import { dict } from 'components/IconExporter'

export interface IProps {
  color?: 'primary' | 'secondary'
  icon: keyof typeof dict
  size?: 'small' | 'medium' | 'large'
  iconWidth?: number | string
  isLoading?: boolean
  onClick?: () => void
}

interface IButtonProps {
  color?: 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
}
export const ButtonStyled = styled.button<IButtonProps>`
  align-items: center;
  background-color: ${props => handleButtonColor(props)};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: ${props => handleSizing(props)};
  justify-content: center;
  outline: none;
  transition: all ease 0.3s;
  width: ${props => handleSizing(props)};

  &:hover {
    background-color: ${props => handleButtonColor(props)};
  }
  svg {
    fill: ${props =>
      props.color ? props.theme.colors.white : props.theme.colors.gray6};
    width: ${props => (props.size === 'small' ? '21px' : '24px')};
  }
`

const handleSizing = (props: IButtonProps) => {
  switch (props.size) {
    case 'small':
      return '28px'
    case 'medium':
      return '35px'
    case 'large':
      return '49px'
    default:
      return '28px'
  }
}

const handleButtonColor = (props: any) => {
  switch (props.color) {
    case 'primary':
      return props.theme.colors.blue4
    case 'secondary':
      return props.theme.colors.green4
    default:
      return props.theme.colors.gray2
  }
}
