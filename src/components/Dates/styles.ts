import styled from 'styled-components'
import ArrowLeft from 'assets/icons/arrow-left.svg'
import ArrowRight from 'assets/icons/arrow-right.svg'

export const DatePickerStyled = styled.div`
  margin: 0;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0;

  .DateInput_input {
    background: ${({ theme }) => theme.colors.gray1};
    border-radius: 8px 8px 0px 0px;
    border-bottom: 2px ${({ theme }) => theme.colors.gray4} solid;

    /* Necessário reestilização da fonte */
    font-weight: 400;
    ${({ theme }) => theme.fontTypes.body};

    width: 145px;
    height: 35px;
    input {
      width: 145px;
      height: 35px;
    }

    @media ${props => props.theme.mediaQueries.sm} {
      width: 100%;
      height: 35px;
      input {
        width: 100%;
        height: 35px;
      }
    }
  }

  .DateInput_input__focused {
    border-bottom: 2px ${({ theme }) => theme.colors.blue4} solid;
  }

  .DateRangePicker_picker.DateRangePicker_picker__directionLeft {
    @media ${props => props.theme.mediaQueries.sm} {
      display: flex;
      width: 100%;
      justify-content: center;
    }
  }

  .DayPicker.DayPicker__horizontal.DayPicker__withBorder
    > div
    > div:first-child {
    @media ${props => props.theme.mediaQueries.sm} {
      width: 100% !important;
    }
  }

  .DayPicker_transitionContainer.DayPicker_transitionContainer__horizontal {
    @media ${props => props.theme.mediaQueries.sm} {
      width: 100% !important;
    }
  }

  .CalendarMonthGrid.CalendarMonthGrid__horizontal {
    @media ${props => props.theme.mediaQueries.sm} {
      width: 94% !important;
      max-height: 325px;
    }
  }

  .DayPicker_weekHeader {
    @media ${props => props.theme.mediaQueries.sm} {
      display: flex;
      left: 0px;
      padding: 0px 7% 0 4% !important;
      width: 100%;
      justify-content: space-around;
    }
  }

  .DayPicker_weekHeader_ul {
    @media ${props => props.theme.mediaQueries.sm} {
      display: flex;
      width: 100%;
      margin: 0;
      padding: 0;
      justify-content: space-around;
    }
  }

  .DayPicker_weekHeader_li {
    text-transform: capitalize;
    @media ${props => props.theme.mediaQueries.sm} {
      width: 35px !important;
    }
  }

  .CalendarDay {
    border: none;
    color: ${({ theme }) => theme.colors.gray5};
    background: ${({ theme }) => theme.colors.white};

    /* Necessário reestilização da fonte */
    font-weight: 400;
    ${({ theme }) => theme.fontTypes.body};
  }

  .CalendarDay__blocked_calendar,
  .CalendarDay__blocked_out_of_range {
    color: ${({ theme }) => theme.colors.gray4};
    background-color: ${({ theme }) => theme.colors.gray1};
  }

  .CalendarDay__default:hover {
    color: ${({ theme }) => theme.colors.gray6};
    background-color: ${({ theme }) => theme.colors.blue1};
    border-radius: 4px;
  }

  .CalendarDay__blocked_calendar.CalendarDay__default:hover {
    color: ${({ theme }) => theme.colors.gray4};
    background-color: ${({ theme }) => theme.colors.gray1};
  }

  .CalendarDay__selected_span {
    background: ${({ theme }) => theme.colors.blue1};
    color: ${({ theme }) => theme.colors.gray6};
    &:hover {
      background: ${({ theme }) => theme.colors.blue1};
    }
  }

  .CalendarMonth_caption {
    color: ${({ theme }) => theme.colors.gray6};
    padding-top: ${({ theme }) => theme.spacing(4)}px;
    padding-bottom: ${({ theme }) => theme.spacing(7)}px;
    text-transform: capitalize;

    /* Necessário sobrescrever o font-weight no elemento strong */
    strong {
      ${({ theme }) => theme.fontTypes.title};
      @media ${props => props.theme.mediaQueries.sm} {
        margin-right: ${({ theme }) => theme.spacing(1)}px;
      }
    }
  }

  .CalendarDay__selected:hover {
    background: ${({ theme }) => theme.colors.blue1} !important;
    color: ${({ theme }) => theme.colors.gray6} !important;
  }

  .CalendarDay__hovered_span:hover,
  .CalendarDay__hovered_span {
    background: ${({ theme }) => theme.colors.blue1};
    color: ${({ theme }) => theme.colors.gray6};
  }
`

const ButtonNav = styled.div`
  cursor: pointer;
  width: 21px;
  height: 21px;
  background-color: ${({ theme }) => theme.colors.gray6};
  transition: all ease 0.3s;
  position: absolute;
  top: 32px;
  line-height: 0.78;
  border-radius: 3px;
  padding: ${({ theme }) => theme.spacing(1)}px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`

export const ButtonNavPrev = styled(ButtonNav)`
  mask-image: url(${ArrowLeft});
  left: 25px;
`

export const ButtonNavNext = styled(ButtonNav)`
  mask-image: url(${ArrowRight});
  right: 25px;
`
