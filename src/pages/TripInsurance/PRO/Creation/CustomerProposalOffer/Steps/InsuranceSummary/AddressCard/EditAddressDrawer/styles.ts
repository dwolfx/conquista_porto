import styled, { css } from 'styled-components'

import Button from 'components/Button'
import DivisorCmp from 'components/Divisor'
import NewInputCmp from 'components/NewInput'
import CEPInputCmp from 'components/Inputs/CEPInput'
import TextCmp from 'components/Text'
import IconExporter from 'components/IconExporter'
import SelectCmp from 'components/Inputs/Select'

const spaceError = css`
  margin-bottom: ${({ theme }) => theme.spacing(8)}px;
`

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
}))``

export const LoadingWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const Input = styled(NewInputCmp)`
  margin-top: ${({ theme: { spacing } }) => spacing(4)}px;
`

export const CEPInput = styled(CEPInputCmp)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;

  ${({ error }) => error && spaceError}
`
export const SearchIcon = styled(IconExporter)``

export const TextInput = styled(NewInputCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;

  ${({ error }) => error && spaceError}
`

export const Select = styled(SelectCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-bottom: 0px;
  }
`

export const ComplementTextInput = styled(NewInputCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const CityTextInput = styled(NewInputCmp)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const ErrorIcon = styled(IconExporter)`
  margin: 0 ${({ theme }) => theme.spacing(2)}px;
  min-width: 16px;
`

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`

export const Text = styled(TextCmp)``
