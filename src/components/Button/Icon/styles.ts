import styled from 'styled-components'
import { dict } from 'components/IconExporter'

export interface IProps {
  color: 'primary' | 'secondary'
  icon: keyof typeof dict
  size?: 'small' | 'large'
  iconWidth?: number | string
  isLoading?: boolean
  onClick?: () => void
}

interface IButtonProps {
  color: 'primary' | 'secondary'
  size: 'small' | 'large'
  iconWidth?: number | string
}
export const ButtonStyled = styled.button<IButtonProps>`
  align-items: center;
  background-color: ${props =>
    props.color === 'primary'
      ? props.theme.colors.green4
      : props.theme.colors.gray2};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: ${props => (props.size === 'small' ? '28px' : '35px')};
  justify-content: center;
  outline: none;
  transition: all ease 0.3s;
  width: ${props => (props.size === 'small' ? '28px' : '35px')};

  &:hover {
    background-color: ${props =>
      props.color === 'primary'
        ? props.theme.colors.green5
        : props.theme.colors.gray3};
  }
  svg {
    fill: ${props =>
      props.color === 'primary'
        ? props.theme.colors.white
        : props.theme.colors.gray6};
    width: ${props => handleSVGWidth(props)};
  }
`

const handleSVGWidth = (props: IButtonProps) => {
  if (props.iconWidth) {
    return props.iconWidth
  }
  return props.size === 'small' ? '10px' : '12px'
}
