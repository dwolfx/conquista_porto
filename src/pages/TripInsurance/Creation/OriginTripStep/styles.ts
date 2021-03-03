import styled, { css } from 'styled-components'
import { Container, Row, Col as ColCmp } from 'styled-bootstrap-grid'
import CountryOriginSelect from 'pages/TripInsurance/commons/CountryOriginSelect'
import Button from 'components/Button'
import InputSelect from 'components/Inputs/Select'
import MultiSelectorComponent from 'components/MultiSelector'
import TextCmp from 'components/Text'
import PopoverCmp from 'components/Popover'
import IconExporter from 'components/IconExporter'

export const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100% - 56px);
  height: auto;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
}
`

export const Col = styled(ColCmp)`
  padding-top: ${({ theme }) => theme.spacing(3)}px;
  padding-bottom: ${({ theme }) => theme.spacing(3)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
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

export const StyledCountryOriginSelect = styled(CountryOriginSelect)``

export const StyledButton = styled(Button)`
  width: 100%;
`

export const StyledRow = styled(Row)`
  height: 100%;
`

export const Select = styled(InputSelect)`
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
`

export const MultiSelector = styled(MultiSelectorComponent)<{
  marginBottom: boolean
}>`
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;

  ${({ marginBottom }) =>
    marginBottom &&
    css`
      margin-bottom: ${({ theme }) => theme.spacing(10)}px;
    `}

  svg {
    width: 21px;
  }
`

export const TooltipText = styled(TextCmp)`
  width: 185px;
`

export const Popover = styled(PopoverCmp)`
  width: 100%;
`

export const PopoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: ${({ theme }) => theme.spacing(5)}px 0px;
`

export const PopoverSubContainer = styled.div`
  width: 100%;
`

export const InfoIcon = styled(IconExporter)`
  margin-left: ${({ theme }) => theme.spacing(1.5)}px;
  margin-bottom: -${({ theme }) => theme.spacing(0.5)}px;
`
