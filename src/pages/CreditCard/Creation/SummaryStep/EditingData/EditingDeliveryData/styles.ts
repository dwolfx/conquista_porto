import styled from 'styled-components'

import ButtonComponent from 'components/Button'
import CEPInputComponent from 'components/Inputs/CEPInput'
import NewInput from 'components/NewInput'

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

export const CEPInput = styled(CEPInputComponent)`
  margin-bottom: ${({ error, theme }) => !!error && `${theme.spacing(5)}px`};
  width: 100%;
`

export const SelectWrapper = styled.div`
  width: 100%;
`

export const Button = styled(ButtonComponent)`
  width: 100%;
`
