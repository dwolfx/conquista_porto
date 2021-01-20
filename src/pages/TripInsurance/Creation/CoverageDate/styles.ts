import styled from 'styled-components'
import Button from 'components/Button'
import Text from 'components/Text'
import DatePickerRangeCmp from 'components/Dates/DatePickerRange'
import IconExporter from 'components/IconExporter'

export const ContentWrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 128px);
`

export const NextButton = styled(Button)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    width: 318px;
    margin-left: auto;
    margin-right: auto;
  }
`
export const QuestionText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;

  @media ${props => props.theme.mediaQueries.sm} {
    width: 75%;
    align-self: center;
  }
`

export const DatePickerRange = styled(DatePickerRangeCmp)`
  align-self: center;
  width: max-content;
  .DateRangePickerInput_arrow {
    width: 28px;
    @media ${props => props.theme.mediaQueries.sm} {
      width: 14px !important;
    }
  }

  .DateInput {
    width: 175px;
    input {
      width: 175px;
    }
    @media ${props => props.theme.mediaQueries.sm} {
      width: calc(50% - 7px);
    }

    @media ${props => props.theme.mediaQueries.md} {
      width: 145px;
      input {
        width: 145px;
      }
    }
  }
`

export const InfoIcon = styled(IconExporter)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  vertical-align: middle;
`

export const TooltipText = styled(Text)`
  width: 213px;
`
