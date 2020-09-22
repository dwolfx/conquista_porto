import styled from 'styled-components'
import { DatePickerStyled } from '../styles'

export const Container = styled(DatePickerStyled)`
  .SingleDatePicker_picker {
    top: 46px !important;
  }

  .SingleDatePickerInput {
    .DateInput_input {
      color: ${({ theme }) => theme.colors.gray6};
      border-radius: 8px 8px 0px 0px;
      border-bottom: 2px ${({ theme }) => theme.colors.gray4} solid;

      /* Necessário reestilização da fonte */
      font-weight: 400;
      ${({ theme }) => theme.fontTypes['body']};
    }
    .DateInput_input__focused {
      border-bottom: 2px ${({ theme }) => theme.colors.blue4} solid;
    }
    input {
      background: ${({ theme }) => theme.colors.gray1};
    }
  }

  .DateInput_fang {
    top: 36px !important;
  }

  .CalendarDay__selected {
    background: ${({ theme }) => theme.colors.blue4};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
  }
`
