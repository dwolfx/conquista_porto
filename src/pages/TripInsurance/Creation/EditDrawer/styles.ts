import styled from 'styled-components'

import NewInput from 'components/NewInput'
import CountryOriginSelectCmp from '../../commons/CountryOriginSelect'
import DivisorCmp from 'components/Divisor'
import SelectCmp from 'components/Inputs/Select'
import DatePickerRangeCmp from 'components/Dates/DatePickerRange'
import ButtonCmp from 'components/Button'
import Text from 'components/Text'
import PopoverCmp from 'components/Popover'
import IconExporter from 'components/IconExporter'

export const Input = styled(NewInput)`
  margin-bottom: ${({ error, theme }) => !!error && `${theme.spacing(5)}px`};
  width: 100%;
`

export const CountryOriginSelect = styled(CountryOriginSelectCmp)`
  width: 100%;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div + div {
    margin-top: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const Divisor = styled(DivisorCmp)`
  margin: ${({ theme }) => theme.spacing(3)}px 0;
`

export const Select = styled(SelectCmp)`
  width: 100%;
`

export const DatePickerRange = styled(DatePickerRangeCmp)`
  align-self: center;
  width: max-content;
  .DateRangePickerInput_arrow {
    width: 7px;
    
    @media ${props => props.theme.mediaQueries.lg} {
      width: 14px !important;
    }

    @media ${props => props.theme.mediaQueries.xs} {
      width: 21px !important;
    }

  }

  .DateInput {
    width: 160px;
    input {
      width: 160px;
    }

    @media ${props => props.theme.mediaQueries.lg} {
      width: 200px;
      input {
        width: 200px;
      }
    }

    @media ${props => props.theme.mediaQueries.xs} {
      width: 150px;
      input {
        width: 150px;
      }
    }

  }
`

export const Label = styled.label`
  margin-top: 0px !important;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px!important;
  color: ${props => props.theme.colors.gray5};
  ${props => props.theme.fontTypes.captionUppercase};
  align-self: end;
`

export const ButtonSubmit = styled(ButtonCmp)`
  width: 100%;
`

export const TooltipText = styled(Text)`
  width: 213px;
` 

export const Popover = styled(PopoverCmp)`
  width: 100%;
  margin: ${({ theme }) => theme.spacing(4)}px 0 ${({ theme }) => theme.spacing(4)}px 0 ;
`

export const InfoIcon = styled(IconExporter)`
  margin-left: ${({ theme }) => theme.spacing(1.5)}px;
  margin-bottom: -${({ theme }) => theme.spacing(0.5)}px;
`