import styled from 'styled-components'

import ButtonComponent from 'components/Button'
import DivisorComponent from 'components/Divisor'
import NewInput from 'components/NewInput'
import Text from 'components/Text'
import VerticalListComponent from 'components/VerticalList'

export const CustomerData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

export const Label = styled(Text).attrs(() => ({
  type: 'captionUppercase',
  bold: true,
  color: 'gray5',
}))``

export const Value = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))``

export const Divisor = styled(DivisorComponent)`
  margin: ${({ theme }) => `${theme.spacing(4)}px 0 ${theme.spacing(4)}px`};
`

export const Button = styled(ButtonComponent)`
  width: 100%;
`

export const UpdateProfileButton = styled(ButtonComponent)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

export const VerticalList = styled(VerticalListComponent)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div + div {
    margin-top: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const Input = styled(NewInput)`
  margin-bottom: ${({ error, theme }) => !!error && `${theme.spacing(5)}px`};
  width: 100%;
`

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`
