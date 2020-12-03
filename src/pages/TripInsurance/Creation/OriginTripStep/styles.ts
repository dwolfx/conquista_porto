import styled from 'styled-components'
import { Container, Row } from 'styled-bootstrap-grid'
import CountryOriginSelect from 'pages/TripInsurance/commons/CountryOriginSelect'
import Button from 'components/Button'

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  background-color: ${({ theme }) => theme.colors.white};
`

export const StyledContainer = styled(Container)`
  height: 100%;
`

export const FlexContainer = styled.div`
  @media ${props => props.theme.mediaQueries.xs} {
    width: 75%;
    margin: 0 auto;
  }
`

export const StyledCountryOriginSelect = styled(CountryOriginSelect)`
  margin: ${({ theme }) => theme.spacing(5)}px 0;
`

export const StyledButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
  width: 100%;
`

export const StyledRow = styled(Row)`
  height: 100%;
`
