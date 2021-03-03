import styled from 'styled-components'

interface IContainer {
  size: 'large' | 'medium-large' | 'medium' | 'small' | 'default'
  noPadding: boolean
}

export const Container = styled.div<IContainer>`
  width: 100%;
  height: ${props => {
    switch (props.size) {
      case 'large':
        return `${props.theme.spacing(9)}px`
      case 'medium-large':
        return `${props.theme.spacing(8)}px`
      case 'medium':
        return `${props.theme.spacing(5)}px`
      case 'small':
        return `${props.theme.spacing(4)}px`
      default:
        return `${props.theme.spacing(7)}px`
    }
  }};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => (props.noPadding ? '0' : '0 14px')};
`

interface IBlocks {
  hasStartBlock?: boolean
  hasEndBlock?: boolean
}

export const StartBlock = styled.div<IBlocks>`
  display: flex;
  align-items: center;
  margin-right: ${({ theme, hasEndBlock }) =>
    hasEndBlock ? `${theme.spacing(1)}px` : 0};

  && > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const EndBlock = styled.div<IBlocks>`
  display: flex;
  align-items: center;
  margin-left: ${({ theme, hasStartBlock }) =>
    hasStartBlock ? `${theme.spacing(1)}px` : 0};

  && > *:not(:first-child) {
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`
