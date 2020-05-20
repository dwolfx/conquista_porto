import styled from 'styled-components'
export interface IProps {
  vertical?: boolean
  customSize?: string
}
export const StyledDivisor = styled.div<IProps>`
  ${props =>
    props.vertical
      ? `border-left: 1px solid ${props.theme.colors.gray2}`
      : `border-bottom: 1px solid ${props.theme.colors.gray2}`};
  height: ${props => {
    if (props.vertical) {
      return props.customSize && props.customSize
    }
    return '0%'
  }};
  width: ${props => {
    if (props.vertical) {
      return '0%'
    }
    return props.customSize ? props.customSize : '100%'
  }};
`
