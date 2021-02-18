import styled, { css } from 'styled-components'
import NewInput from 'components/NewInput'
import SelectCmp from 'components/Inputs/Select'
import IconExporter from 'components/IconExporter'
import CEPInputCmp from 'components/Inputs/CEPInput'
import LoadingCmp from 'components/Loading'
import TextCmp from 'components/Text'

const spaceError = css`
  margin-bottom: ${({ theme }) => theme.spacing(8)}px;
`

const spaceZipCode = css`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const CEPInput = styled(CEPInputCmp)`
  ${({ error }) => error && spaceError}
`

export const WrapperZipcodeInput = styled.div<{ space: boolean }>`
  ${({ space }) => space && spaceZipCode}
`

export const TextInput = styled(NewInput)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;

  ${({ error }) => error && spaceError}
`

export const ComplementTextInput = styled(NewInput)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 410px;
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const CityTextInput = styled(NewInput)`
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 410px;
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Select = styled(SelectCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-bottom: 0px;
  }
`

export const SearchIcon = styled(IconExporter)``

export const ErrorIcon = styled(IconExporter)`
  margin: 0 ${({ theme }) => theme.spacing(2)}px;
  min-width: 16px;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    flex-direction: row;
  }
`

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const LoadingWrapper = styled.div`
  width: 28px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

export const Loading = styled(LoadingCmp)`
  margin: 0;
`

export const Text = styled(TextCmp)``
