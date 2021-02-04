import styled from 'styled-components'

import SelectCmp from 'components/Inputs/Select'
import { OptionsItem } from 'components/Inputs/Select/styles'

export const Select = styled(SelectCmp)`
  width: 100%;

  ${OptionsItem} {
    height: auto;
    padding-top: ${({ theme }) => `${theme.spacing(2)}px`};
    padding-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
  }
`
