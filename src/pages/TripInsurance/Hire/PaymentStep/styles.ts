import styled from 'styled-components'

import Card from 'components/Card'
import DivisorDescription from 'pages/TripInsurance/commons/DivisorDescription'
import Select from 'components/Inputs/Select'
import Text from 'components/Text'
import NewInput from 'components/NewInput'
import RadioComponent from 'components/Inputs/Radio/New'
import Popover from 'components/Popover'
import { StyledDivisor as Divisor } from '../../commons/DivisorDescription/styles'

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 119px);
  padding: ${({ theme }) => theme.spacing(3)}px 0;
  overflow-y: scroll;

  @media ${props => props.theme.mediaQueries.lg} {
    padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(10)}px`};
  }

  @media ${props => props.theme.mediaQueries.md} {
    padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(1)}px`};
  }
`

export const BottomBar = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(6)}px`};
  position: fixed;
  bottom: 0;
  left: 0;

  @media ${props => props.theme.mediaQueries.lg} {
    padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(12)}px`};
  }

  @media ${props => props.theme.mediaQueries.md} {
    padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(4)}px`};
  }

  @media ${props => props.theme.mediaQueries.xs} {
    padding: ${({ theme }) => theme.spacing(2)}px;

    button {
      width: 100%;
    }
  }
`

export const StyledCard = styled(Card)`
  > div {
    border: 0;
    padding: 0;
  }

  & + div {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }

  padding: ${({ theme }) =>
    `${theme.spacing(2)}px ${theme.spacing(7)}px ${theme.spacing(6)}px`};

  @media ${props => props.theme.mediaQueries.lg} {
    padding: ${({ theme }) => `${theme.spacing(5)}px ${theme.spacing(7)}px`};

    h5:first-child {
      margin-top: ${({ theme }) => theme.spacing(5)}px;
    }
  }

  @media ${props => props.theme.mediaQueries.xs} {
    padding: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(3)}px`};
  }
`

export const StyledDivisor = styled(DivisorDescription)`
  max-width: 294px;
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  @media ${props => props.theme.mediaQueries.lg} {
    ${Divisor} {
      border-color: transparent;
    }
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing(6)}px;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    text-align: left;
  }
`

export const MarginTopStyledText = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`
export const CreditCardWrapper = styled.div<{ cardIsSelected?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(4)}px`};
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme, cardIsSelected }) =>
      cardIsSelected ? theme.colors.blue4 : theme.colors.gray3};
  border-radius: 8px;
  width: 410px;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  transition: border-color ease 0.3s;

  @media ${props => props.theme.mediaQueries.xs} {
    width: 100%;
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const StyledSelect = styled(Select)`
  width: 631px;

  & + div {
    margin-top: ${({ theme }) => theme.spacing(4)}px;
  }

  input {
    text-transform: inherit;
  }

  @media ${props => props.theme.mediaQueries.lg} {
    margin-top: ${({ theme }) => theme.spacing(5)}px;
  }
`

export const BigInput = styled(NewInput)`
  & + div {
    margin-top: ${({ theme }) => theme.spacing(4)}px;
  }
  width: 631px;
`
export const SmallText = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`
export const SmallInput = styled(NewInput)`
  width: 192px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    width: 100%;
    margin-right: 0;
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const FlexWrapper = styled.div<{ hasMargin?: boolean }>`
  margin-top: ${({ theme, hasMargin }) => theme.spacing(hasMargin ? 4 : 0)}px;
  display: flex;
  align-items: center;

  @media ${props => props.theme.mediaQueries.xs} {
    flex-direction: column;
    justify-content: center;
  }
`
export const OtherFlexWrapper = styled.div<{ hasMargin?: boolean }>`
  margin-top: ${({ theme, hasMargin }) => theme.spacing(hasMargin ? 4 : 0)}px;
  display: flex;
  align-items: center;
`

export const StyledRadio = styled(RadioComponent)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
`
export const TextWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing(3)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    h6 {
      word-break: break-word;
    }
  }
`

export const StyledPopover = styled(Popover)`
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`

export const PopoverText = styled(Text).attrs(() => ({
  bold: true,
  type: 'body',
  color: 'gray5',
}))`
  max-width: 213px;
`
