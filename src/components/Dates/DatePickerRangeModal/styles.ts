import styled from 'styled-components'
import CloseIcon from 'assets/icons/close.svg'
import ButtonLink from 'components/Button/Link'
import Modal from 'components/Modal/ModalNew'
import { Row, Col } from 'styled-bootstrap-grid'
import { ModalContainer, ChildrenWrapper } from 'components/Modal/stylesNew'
import Button from 'components/Button'

export const ModalStyled = styled(Modal)`
  ${ModalContainer} {
    width: 665px;
    height: 480px;
    padding: ${({ theme }) => theme.spacing(2)}px;

    @media ${props => props.theme.mediaQueries.sm} {
      width: auto;
      height: auto;
      margin: 14px;
    }
  }

  ${ChildrenWrapper} {
    height: inherit;
    padding: ${({ theme }) => theme.spacing(2)}px;

    @media ${props => props.theme.mediaQueries.sm} {
      padding: 0;
      ::-webkit-scrollbar {
        display: none; /* Safari, Chrome, Firefox */
      }
      scrollbar-width: none; /* Firefox for Android */
    }
  }
`
export const RowDatePickerRange = styled(Row)`
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 375px;
  margin: 0 !important;

  @media ${props => props.theme.mediaQueries.sm} {
    max-height: 350px;
  }
`

export const RowHeaderControlls = styled(Row)`
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 0 ${({ theme }) => theme.spacing(3)}px 0;
`

export const ColDatePickerRange = styled(Col)`
  margin: 0;
`

export const RowButtons = styled(Row)`
  padding: ${({ theme }) => theme.spacing(2)}px 0 0 0;
  margin: 0;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  @media ${props => props.theme.mediaQueries.sm} {
    flex-direction: column;
    :last-child {
      margin-bottom: 0;
    }
  }
`

export const CloseButton = styled.div`
  background-color: ${props => props.theme.colors.gray5};
  cursor: pointer;
  height: ${props => props.theme.spacing(3)}px;
  mask-image: url(${CloseIcon});
  transition: all ease 0.3s;
  width: ${props => props.theme.spacing(3)}px;

  &:hover {
    background-color: ${props => props.theme.colors.blue4};
  }
`
interface IButtonClearDates {
  hasSelectedDate: boolean
}

export const LinkClearDates = styled(ButtonLink)<IButtonClearDates>`
  margin-left: ${({ theme }) => theme.spacing(4)}px;
  color: ${({ theme, hasSelectedDate }) =>
    hasSelectedDate ? theme.colors.blue4 : theme.colors.gray4};
`

export const ButtonClearDates = styled(Button)<IButtonClearDates>`
  margin-left: ${({ theme }) => theme.spacing(4)}px;
  color: ${({ theme, hasSelectedDate }) =>
    hasSelectedDate ? theme.colors.blue4 : theme.colors.gray4};
  border: ${({ theme, hasSelectedDate }) =>
    `1px solid ${hasSelectedDate ? theme.colors.blue4 : theme.colors.gray4}`};

  @media ${props => props.theme.mediaQueries.sm} {
    width: 100%;
    margin: ${({ theme }) => theme.spacing(2)}px 0 0 0;
  }
`

export const ButtonStyled = styled(Button)`
  margin-left: ${({ theme }) => theme.spacing(3)}px;

  @media ${props => props.theme.mediaQueries.sm} {
    width: 100%;
    margin: ${({ theme }) => theme.spacing(2)}px 0 0 0;
  }
`

export const DatePickerRangeWrapper = styled.div`
  display: flex;
  height: 35px;
`
