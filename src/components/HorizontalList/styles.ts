import styled from 'styled-components'

interface IContainer {
  size: 'large' | 'small' | 'default'
  noPadding: boolean
}

export const Container = styled.div<IContainer>`
  width: 100%;
  height: ${props => {
    switch (props.size) {
      case 'large':
        return '63px'
      case 'small':
        return '28px'
      default:
        return '49px'
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
