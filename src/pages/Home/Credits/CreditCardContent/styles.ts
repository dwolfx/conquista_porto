import styled from 'styled-components'
import HorizontalList from 'components/HorizontalList'

export const HorizontalListStyled = styled(HorizontalList)`
  margin-bottom: ${({ theme }) => `${theme.spacing(1)}px`};
`
