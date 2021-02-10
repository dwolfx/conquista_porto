import styled from 'styled-components'
import Flexible from 'components/FlexibleLayerContent'
import { Content as FlexContent } from 'components/FlexibleLayerContent/styles'

export const Content = styled.div`
  button {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
    &:last-child {
      margin-right: 0;
    }
  }
`

export const FlexibleLayerContentStatus = styled(Flexible)`
  ${FlexContent} {
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`

export const FooterButtonsWrapper = styled.div`
  button {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
    &:last-child {
      margin-right: 0;
    }
  }
`

export const FlexibleLayerContentPRO = styled(Flexible)`
  ${Content} {
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    * {
      margin-bottom: ${({ theme }) => theme.spacing(3)}px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`

export const FlexibleLayerContent = styled(Flexible)`
  ${Content} {
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export const UserBox = styled.div`
  margin-top: 100px;
  width: 297px;
  & > * {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export const ErrorMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-bottom: 14px;
  }
`
