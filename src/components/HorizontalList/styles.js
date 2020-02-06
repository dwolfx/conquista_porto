import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: ${props => {
    switch (props.size) {
      case 'large':
        return '63px'
      case 'small':
        return '35px'
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
  && > * {
    margin-right: ${props => props.marginBetweenElements};
  }
`

export const EndBlock = styled.div`
  display: flex;
  align-items: center;
  && > * {
    margin-left: ${props => props.marginBetweenElements};
  }
`
