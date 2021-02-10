import styled from 'styled-components'
import DataShower from 'pages/CreditCard/Creation/SummaryStep/DataShower'

export const DataDisplay = styled(DataShower)`
  padding-left: ${({ theme }) => theme.spacing(2)}px;

  div {
    overflow-wrap: anywhere;
  }
`

export const WrapperContact = styled.div`
  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`
