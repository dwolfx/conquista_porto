import styled from 'styled-components'
import { Container as ContainerCmp, Col as ColCmp } from 'styled-bootstrap-grid'
import ButtonCmp from 'components/Button'
import CardCmp from 'components/Card'
import SelectCmp from 'components/Inputs/Select'
import RadioCmp from 'components/Inputs/Radio/New'
import TextCmp from 'components/Text'
import NewInput from 'components/NewInput'
import { IHasError } from './types'

export const Container = styled(ContainerCmp)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

export const Col = styled(ColCmp)`
  padding: 0;
`

export const InformationWrapper = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`};
`

export const Card = styled(CardCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(5)}px;
`

export const CompanionCard = styled(CardCmp)`
  display: flex;
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacing(7)}px 0
    ${({ theme }) => theme.spacing(7)}px;
`

export const TitleText = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const NavigationItem = styled.div`
  display: inline-flex;
  padding-left: ${({ theme }) => theme.spacing(3)}px;
  border-left: 2px solid ${({ theme }) => theme.colors.gray1};
  &:first-of-type {
    border-left: 2px solid ${({ theme }) => theme.colors.blue4};
  }
`

export const BadgeNotification = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.magenta2};
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`

export const Table = styled.table`
  display: table;
  border-collapse: separate;
  border-spacing: 0;
  width: 751px;

  tr td:first-child,
  th td:first-child {
    border-left: 1px solid ${props => props.theme.colors.gray3};
    border-right: 0px;
  }
  tr td:last-child,
  th td:last-child {
    border-left: 0px;
  }
`

export const Thead = styled.thead`
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  max-height: 56px;
`
export const THeadTr = styled.tr`
  height: 56px;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
`
export const Tr = styled.tr`
  height: 79px;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};

  //Last Row
  &:last-child {
    border-bottom: none;

    td:first-child {
      border-bottom-left-radius: 8px;
    }
    td:last-child {
      border-bottom-right-radius: 8px;
    }
  }

  // Last Column
  & > td:last-child,
  th:last-child {
    // Horizontal Tablet
    p {
      margin-right: ${({ theme }) => `${theme.spacing(12)}px`};
    }
  }
`

export const Th = styled.th`
  text-align: start;
  background-color: ${({ theme }) => theme.colors.gray1};
  width: 182px;
  padding-right: 127px;
  padding-left: 21px;
  border: 1px solid ${props => props.theme.colors.gray3};

  &:first-child {
    border-right: 0;
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-left: 0;
    padding-left: 0px;
    border-top-right-radius: 8px;
  }
`

export const ThText = styled(TextCmp)``

export const Td = styled.td`
  border-right: 1px solid ${props => props.theme.colors.gray3};
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
`

export const Tbody = styled.tbody``

export const StatusText = styled(TextCmp)`
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const NameText = styled(TextCmp)`
  margin-left: ${({ theme }) => theme.spacing(3)}px;
  display: grid;
`

export const CardTitle = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`

export const SelectGender = styled(SelectCmp)`
  margin: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}px`};
  max-width: 630px;
`

export const SelectTelephoneType = styled(SelectCmp)``

export const RadioTitle = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const RadioOptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

export const Radio = styled(RadioCmp)`
  margin-right: ${({ theme }) => theme.spacing(4)}px;
`

export const Text = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const TextInput = styled(NewInput)<IHasError>`
  margin-bottom: ${({ theme, error }) =>
    error ? theme.spacing(5) : theme.spacing(2)}px;
`

export const TextInputMedium = styled(NewInput)<IHasError>`
  margin-right: ${({ theme, error }) =>
    error ? theme.spacing(5) : theme.spacing(2)}px;
  width: 410px;
`

export const ContentWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  max-width: 658px;
`

export const InputsWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  flex-direction: row;
`

export const FooterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const FooterCol = styled(ColCmp)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: ${({ theme }) => theme.spacing(3)}px;
`

export const Button = styled(ButtonCmp)`
  width: 177px;
`
