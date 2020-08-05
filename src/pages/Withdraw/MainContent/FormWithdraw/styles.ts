import styled from 'styled-components'

import MoneyInputCmp from 'components/Inputs/Money'
import TextComponet from 'components/Text'

export const InputWrapper = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(1)}px`};
  width: 50%;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const MoneyInput = styled(MoneyInputCmp)<{
  blocked: boolean | undefined
}>`
  pointer-events: ${({ blocked }) => (blocked ? 'none' : 'initial')};
`

export const LabelText = styled(TextComponet)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`
