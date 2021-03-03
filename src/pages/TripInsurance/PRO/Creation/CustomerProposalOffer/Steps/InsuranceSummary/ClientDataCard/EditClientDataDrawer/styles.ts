import styled from 'styled-components'

import Button from 'components/Button'
import DivisorComponent from 'components/Divisor'
import RadioNewComponent from 'components/Inputs/Radio/New'
import { RadioInput } from 'components/Inputs/Radio/New/styles'
import TextComponent from 'components/Text'

export const Divisor = styled(DivisorComponent)`
  margin: ${({ theme }) => `${theme.spacing(1)}px 0`};
`

export const UpdateProfileButton = styled(Button)`
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing(3)}px 0`};
`

export const SaveChangesButton = styled(Button)`
  width: 100%;
`

export const Radio = styled(RadioNewComponent)`
  ${RadioInput} {
    margin-right: ${({ theme }) => `${theme.spacing(2)}px`};
  }

  &:first-child {
    margin-right: ${({ theme }) => `${theme.spacing(2)}px`};
  }
`

export const RadioText = styled(TextComponent).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))`
  padding-top: ${({ theme }) => theme.spacing(1)}px;
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`

export const RadioOptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  margin-left: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const LoadingWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`
