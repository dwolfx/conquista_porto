import styled from 'styled-components'

interface IContainer {
  size: 'large' | 'medium' | 'small' | 'default'
  noPadding: boolean
}

export const Container = styled.div<IContainer>`
  width: 100%;
  height: ${props => {
    switch (props.size) {
      case 'large':
        return `${props.theme.spacing(9)}px`
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

export const StartBlock = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${props => props.theme.spacing(1)}px;

  && > *:not(:last-child) {
    margin-right: ${props => props.theme.spacing(2)}px;
  }
`

export const EndBlock = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${props => props.theme.spacing(1)}px;

  && > *:not(:first-child) {
    margin-left: ${props => props.theme.spacing(2)}px;
  }
`
