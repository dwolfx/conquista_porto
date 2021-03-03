import styled from 'styled-components'

import Button from 'components/Button'
import NewInputCmp from 'components/NewInput'
import { InputFieldGroup, InputWrapper } from 'components/NewInput/styles'
import RadioCmp from 'components/Inputs/Radio'
import { RadioWrapper } from 'components/Inputs/Radio/styles'
import SelectCmp from 'components/Inputs/Select'
import { OptionsWrapper } from 'components/Inputs/Select/styles'
import TextCmp from 'components/Text'

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

  ${RadioWrapper} {
    @media ${({ theme }) => theme.mediaQueries.xs} {
      flex-direction: row;
    }
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

  @media ${({ theme }) => theme.mediaQueries.xs} {
    ${InputFieldGroup} {
      height: 86px;
    }

    ${InputWrapper} {
      height: calc(100% - 38px);
    }

    label {
      display: block;
    }

    ${OptionsWrapper} {
      top: 86px;
    }
  }
`

export const Input = styled(NewInputCmp)`
  margin-top: ${({ theme: { spacing } }) => spacing(4)}px;
`
