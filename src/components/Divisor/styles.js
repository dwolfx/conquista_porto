import styled from 'styled-components'

export const StyledDivisor = styled.div`
  ${props =>
    props.vertical
      ? `border-left: 1px solid ${props.theme.colors.gray2}`
      : `border-bottom: 1px solid ${props.theme.colors.gray2}`};
  width: ${props => {
    if (props.vertical) {
      return '0%'
    }
    return props.customSize ? props.customSize : '100%'
  }};

  height: ${props => {
    if (props.vertical) {
      return props.customSize ? props.customSize : '100%'
    }
    return '0%'
  }};
`
