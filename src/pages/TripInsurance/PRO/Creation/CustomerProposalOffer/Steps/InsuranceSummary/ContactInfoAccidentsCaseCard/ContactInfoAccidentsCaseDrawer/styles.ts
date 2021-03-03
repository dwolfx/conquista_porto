import styled from 'styled-components'

import ButtonCmp from 'components/Button'
import NewInputCmp from 'components/NewInput'

export const SaveChangesButton = styled(ButtonCmp)`
  width: 100%;
`

export const Input = styled(NewInputCmp)`
  & + & {
    margin-top: ${({ theme: { spacing } }) => spacing(4)}px;
  }
`
