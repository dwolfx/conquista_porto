import styled from 'styled-components'

import DateInputComponent from 'components/Inputs/DateInput'
import NewInput from 'components/NewInput'

export const SelectWrapper = styled.div`
  width: 100%;
`

export const DateInput = styled(DateInputComponent)`
  margin-bottom: ${({ error, theme }) => !!error && `${theme.spacing(5)}px`};
  width: 100%;
`

export const Input = styled(NewInput)`
  margin-bottom: ${({ error, theme }) => !!error && `${theme.spacing(5)}px`};
  width: 100%;
`
