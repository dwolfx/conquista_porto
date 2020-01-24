import styled from 'styled-components'

export const StyledDivisor = styled.div`
  ${props =>
    props.vertical
      ? `border-left: 1px solid ${props.theme.colors.gray2}`
      : `border-bottom: 1px solid ${props.theme.colors.gray2}`};
  width: ${props =>
    props.vertical ? '0%' : props.customSize ? props.customSize : '100%'};
  height: ${props =>
    props.vertical ? (props.customSize ? props.customSize : '100%') : '0%'};
`
