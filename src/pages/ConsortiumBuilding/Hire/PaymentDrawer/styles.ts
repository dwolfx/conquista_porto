import styled, { css } from 'styled-components'

import AdministrationFeeSelectCmp from 'pages/ConsortiumBuilding/commons/Inputs/AdministrationFeeSelect'
import BankAccountInputCmp from 'pages/ConsortiumBuilding/commons/Inputs/BankAccountInput'
import BankAccountDigitInputCmp from 'pages/ConsortiumBuilding/commons/Inputs/BankAccountDigitInput'
import BankAgencyInputCmp from 'pages/ConsortiumBuilding/commons/Inputs/BankAgencyInput'
import BankSelectCmp from 'pages/ConsortiumBuilding/commons/Inputs/BankSelect'
import ButtonCmp from 'components/Button'
import DivisorCmp from 'components/Divisor'
import RadioCmp from 'components/Inputs/Radio/New'
import TextCmp from 'components/Text'

import * as i from './types'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
`

export const StyledRadio = styled(RadioCmp)`
  & > input {
    margin-right: ${({ theme }) => theme.spacing(3)}px;
  }
`

export const OptionWrapper = styled.div<i.IOptionWrapper>`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : `81px`)};
  transition: border-color ease 0.3s;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  padding: ${({ noPadding, theme }) =>
    noPadding
      ? `0 ${theme.spacing(3)}px`
      : `${theme.spacing(2)}px ${theme.spacing(3)}px`};

  
  ${({ border, paymentMethodIsSelected, theme }) =>
    border &&
    css`
      border: 1px solid
        ${paymentMethodIsSelected ? theme.colors.blue4 : theme.colors.gray3};
      border-radius: 8px;
    `}

  @media ${props => props.theme.mediaQueries.xs} {
    width: 100%;
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const TextWrapper = styled.div<i.ITextWrapper>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  ${({ marginLeft, theme }) =>
    marginLeft &&
    css`
      margin-left: ${theme.spacing(4)}px;
    `}

  span {
    margin-top: ${({ theme }) => theme.spacing(1)}px;
  }
`

export const PanelWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: ${({ theme }) => theme.spacing(1)}px;

  padding: ${({ theme }) => theme.spacing(2)}px;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const InstallmentsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

export const InstallmentLabel = styled.div`
  width: 144px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

export const HeadlineText = styled(TextCmp).attrs(() => ({
  bold: true,
  color: 'gray6',
  type: 'headline',
}))<i.IHeadlineText>`
  ${({ marginTop, theme }) =>
    marginTop &&
    css`
      margin-top: ${theme.spacing(4)}px;
    `}
`

export const BodyText = styled(TextCmp).attrs(() => ({
  bold: true,
  color: 'gray5',
}))`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

export const AlertText = styled(TextCmp).attrs(() => ({
  bold: true,
  color: 'magenta2',
  type: 'title',
}))`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const Button = styled(ButtonCmp)`
  width: 100%;
`

export const Divisor = styled(DivisorCmp)`
  margin: ${({ theme }) => `${theme.spacing(4)}px 0`};
`

export const BankSelect = styled(BankSelectCmp)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`

export const BankAgency = styled(BankAgencyInputCmp)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const BankAccount = styled(BankAccountInputCmp)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const BankAccountDigit = styled(BankAccountDigitInputCmp)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const AdministrationFeeSelect = styled(AdministrationFeeSelectCmp)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`
