import styled from 'styled-components'

import NewInputCmp from 'components/NewInput'
import RadioCmp from 'components/Inputs/Radio'
import { RadioWrapper } from 'components/Inputs/Radio/styles'
import SelectCmp from 'components/Inputs/Select'
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

export const Radio = styled(RadioCmp)`
  :first-child {
    margin-right: ${({ theme: { spacing } }) => spacing(2)}px;
  }
`

export const Text = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const Select = styled(SelectCmp)`
  margin-top: ${({ theme: { spacing } }) => spacing(4)}px;
`

export const Input = styled(NewInputCmp)`
  margin-top: ${({ theme: { spacing } }) => spacing(4)}px;
`
