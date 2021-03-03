import styled from 'styled-components'

import RadioCmp from 'components/Inputs/Radio'
import { RadioWrapper } from 'components/Inputs/Radio/styles'
import TextCmp from 'components/Text'

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0;
    ${RadioWrapper} {
      flex-direction: row;
    }
  }
`

export const RadioTitle = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const Radio = styled(RadioCmp)`
  :first-child {
    margin-right: ${({ theme: { spacing } }) => spacing(2)}px;
  }
`
