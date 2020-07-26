import styled from 'styled-components'

export const ProfitabilityContent = styled.div`
  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0px ${({ theme }) => theme.spacing(2)}px;
  }
`
