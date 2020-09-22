import styled from 'styled-components'
import { DatePickerStyled } from '../styles'

export const Container = styled(DatePickerStyled)<{
  isOpenInsideModal: boolean
}>`
  .DateRangePicker_picker {
    left: 0 !important;
    visibility: ${({ isOpenInsideModal }) =>
      isOpenInsideModal ? 'visible' : 'inherit'};
    top: ${({ isOpenInsideModal }) =>
      isOpenInsideModal ? '42px !important' : '46px !important'};
  }

  .DateRangePickerInput {
    @media ${props => props.theme.mediaQueries.sm} {
      display: flex;
      justify-content: space-between;
    }
  }

  .DateRangePickerInput_arrow {
    @media ${props => props.theme.mediaQueries.sm} {
      width: 0 !important;
    }
  }

  .DateInput {
    @media ${props => props.theme.mediaQueries.sm} {
      width: calc(50% - 7px);
    }
  }

  .DayPicker_transitionContainer {
    height: 330px !important;
  }

  .DateInput_fang {
    display: ${({ isOpenInsideModal }) =>
      isOpenInsideModal ? 'none' : 'inline'};
    top: ${({ isOpenInsideModal }) =>
      isOpenInsideModal ? '42px !important' : '36px !important'};
  }

  .DayPicker__withBorder {
    /* Caso props "noBorder" box-shadow: none;*/
    box-shadow: ${({ isOpenInsideModal }) =>
      isOpenInsideModal ? 'none' : '0 2px 6px #0000000d, 0 0 0 1px #00000012'};
  }

  .CalendarDay__blocked_calendar.CalendarDay__selected_span {
    color: ${({ theme }) => theme.colors.gray4};
  }

  .CalendarDay__selected.CalendarDay__selected_start {
    background: ${({ theme }) => theme.colors.blue4} !important;
    color: ${({ theme }) => theme.colors.white} !important;
    border-radius: 4px 0px 0px 4px;
  }

  .CalendarDay__selected.CalendarDay__selected_end {
    background: ${({ theme }) => theme.colors.blue4} !important;
    color: ${({ theme }) => theme.colors.white} !important;
    border-radius: 0px 4px 4px 0px;
  }
`

export const NoArrow = styled.div`
  width: 28px;
  background-color: transparent;
`
