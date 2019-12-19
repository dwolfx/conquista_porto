import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${props =>
    props.color === 'primary'
      ? props.theme.colors.green4
      : props.theme.colors.gray2};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: ${props => (props.size === 'small' ? '28px' : '35px')};
  outline: none;
  padding: 7px;
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
  }
`
