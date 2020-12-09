import styled from 'styled-components'
import CEPInput from 'components/Inputs/CEPInput'
import Text from 'components/Text'
import IconExporter from 'components/IconExporter'
import LoadingComponent from 'components/Loading'

export const InputCEP = styled(CEPInput)`
  margin: 0px ${({ theme }) => theme.spacing(2)}px;
`

export const LinkCEPWrapper = styled.div`
  margin: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}`}px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    display: flex;
    flex-direction: row;
    margin: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}`}px;
    justify-content: space-between;
  }
`

export const CEPStateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const LinkCEP = styled(Text)`
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}`}px;
`

export const Icon = styled(IconExporter)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  height: 21px;
  width: 21px;
`

export const Loading = styled(LoadingComponent)`
  margin: 0px;
`

export const LoadingWrapper = styled.div`
  width: 28px;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

export const AddressText = styled(Text)`
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}`}px;
`
