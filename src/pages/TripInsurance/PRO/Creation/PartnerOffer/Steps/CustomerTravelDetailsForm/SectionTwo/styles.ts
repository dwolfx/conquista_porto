import styled from 'styled-components'

import NewInput from 'components/NewInput'
import SelectCmp from 'components/Inputs/Select'

export const TextInput = styled(NewInput)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const InputsWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  flex-direction: row;

  @media ${props => props.theme.mediaQueries.xs} {
    flex-direction: column;
    padding-top: 0;
  }
`

export const TextInputMedium = styled(NewInput)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  width: 410px;

  @media ${props => props.theme.mediaQueries.xs} {
    margin-right: 0;
    width: 100%;
  }
`

export const SelectTelephoneType = styled(SelectCmp)`
  @media ${props => props.theme.mediaQueries.xs} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`
