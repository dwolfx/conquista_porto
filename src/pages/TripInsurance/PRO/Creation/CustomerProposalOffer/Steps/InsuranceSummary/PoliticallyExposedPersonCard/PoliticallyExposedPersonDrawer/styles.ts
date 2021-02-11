import styled from 'styled-components'

import Button from 'components/Button'
import DivisorCmp from 'components/Divisor'
import NewInputCmp from 'components/NewInput'
import RadioCmp from 'components/Inputs/Radio'
import SelectCmp from 'components/Inputs/Select'
import TextCmp from 'components/Text'

export const Divisor = styled(DivisorCmp)`
  margin: ${({ theme: { spacing } }) => spacing(1)}px;
`

export const SaveChangesButton = styled(Button)`
  width: 100%;
`

export const Headline = styled(TextCmp).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))``

export const ExplanationText = styled(TextCmp).attrs(() => ({
  type: 'body',
  bold: true,
  color: 'gray5',
}))`
  margin-top: ${({ theme: { spacing } }) => spacing(2)}px;
`

export const RadioText = styled(TextCmp).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))`
  padding-top: ${({ theme: { spacing } }) => spacing(1)}px;
  margin-left: ${({ theme: { spacing } }) => spacing(2)}px;
`

export const Radio = styled(RadioCmp)`
  :first-child {
    margin-right: ${({ theme: { spacing } }) => spacing(2)}px;
  }
`

export const RadioOptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${({ theme: { spacing } }) => spacing(4)}px;

  & label {
    margin-right: ${({ theme: { spacing } }) => spacing(4)}px;
  }
`

export const LoadingWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const Select = styled(SelectCmp)`
  margin-top: ${({ theme: { spacing } }) => spacing(4)}px;
`

export const Input = styled(NewInputCmp)`
  margin-top: ${({ theme: { spacing } }) => spacing(4)}px;
`
