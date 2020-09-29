import styled from 'styled-components'
import { StartBlock } from 'components/HorizontalList/styles'
import HorizontalList from 'components/HorizontalList'
import Icon from 'components/IconExporter'

export const Warning = styled(HorizontalList)`
  max-width: 460px;
  margin: 0 auto;
  text-align: left;
  ${StartBlock} svg {
    margin-right: 0;
  }
`

export const IconStyled = styled(Icon)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`
