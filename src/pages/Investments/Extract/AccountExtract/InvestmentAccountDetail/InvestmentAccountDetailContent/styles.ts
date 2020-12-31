import styled from 'styled-components'
import VerticalList from 'components/VerticalList'

export const Wrapper = styled.div``

export const VerticalListWrapper = styled.div`
  padding: 0;
`

export const VerticalListMargin = styled(VerticalList)`
  margin: ${props => props.theme.spacing(1)}px 0px;
`

export const MobileWrapper = styled.div`
  background-color: #fff;
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(3)}px`};
`
