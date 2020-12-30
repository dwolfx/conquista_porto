import styled from 'styled-components'
import { dict } from 'components/IconExporter'

export interface IProps {
  color?: 'primary' | 'secondary' | 'transparent'
  icon: keyof typeof dict
  size?: 'small' | 'medium' | 'large'
  iconWidth?: number | string
  isLoading?: boolean
  onClick?: () => void
  shape?: 'square' | 'round'
}

type IButtonProps = Pick<IProps, 'color' | 'size' | 'shape'>

export const ButtonStyled = styled.button<IButtonProps>`
  align-items: center;
  background: ${props => handleButtonColor(props)};
  border: none;
  border-radius: ${({ shape }) => (shape === 'square' ? '4px' : '50%')};
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
    height: ${props => (props.size === 'small' ? '21px' : '24px')};
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
      return `linear-gradient(90deg, ${props.theme.colors.blue4} 0%, ${props.theme.colors.blue5} 146.43%)`
    case 'secondary':
      return `linear-gradient(90deg, ${props.theme.colors.green3} 0%, ${props.theme.colors.green5} 201.79%)`
    case 'transparent':
      return props.theme.colors.unset
    default:
      return props.theme.colors.gray2
  }
}
