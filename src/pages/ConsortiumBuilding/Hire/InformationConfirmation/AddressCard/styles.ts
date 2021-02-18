import styled from 'styled-components'
import Text from 'components/Text'
import DataShower from 'pages/CreditCard/Creation/SummaryStep/DataShower'

export const DataDisplay = styled(DataShower)`
  padding-left: ${({ theme }) => theme.spacing(2)}px;

  div {
    overflow-wrap: anywhere;
  }
`

export const WrapperAddressCard = styled.div`
  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const WrapperAddressForm = styled.div`
  max-width: 658px;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}`}px;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const WrapperTextsAddressForm = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const TextAddressCard = styled(Text).attrs(() => ({
  color: 'gray5',
  bold: true,
}))`
  max-width: 630px;
`
