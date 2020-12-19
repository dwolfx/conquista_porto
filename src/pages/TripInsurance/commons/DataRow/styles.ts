import styled from 'styled-components'

import HorizontalListComp from 'components/HorizontalList'
import { StartBlock, EndBlock } from 'components/HorizontalList/styles'
import VerticalListComp from 'components/VerticalList'

export const VerticalList = styled(VerticalListComp)`
  margin: ${({ theme }) => theme.spacing(2)}px;
  width: auto;
`
export const HorizontalList = styled(HorizontalListComp)`
  width: auto;
  height: auto;
  display: flex;
  justify-content: flex-start;
  margin: ${({ theme }) => `${theme.spacing(2)}px 0`};

  ${StartBlock} {
    width: 161px;
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }

  ${EndBlock} {
    width: auto;
  }
`
