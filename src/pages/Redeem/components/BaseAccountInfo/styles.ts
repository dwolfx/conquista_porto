import styled from 'styled-components'
import Loading from 'components/Loading'
import Icon from 'components/IconExporter'

export const LoadingSpinner = styled(Loading)`
  margin: 0 0 0 ${({ theme }) => theme.spacing(2)}px !important;
  height: ${({ theme }) => theme.spacing(4)}px;
  width: ${({ theme }) => theme.spacing(4)}px;
`

export const IconRetry = styled(Icon).attrs(() => ({
  name: 'reload',
  color: 'blue4',
}))`
  cursor: pointer;
  margin: 0 0 0 ${({ theme }) => theme.spacing(2)}px !important;
  height: ${({ theme }) => theme.spacing(3)}px;
  width: ${({ theme }) => theme.spacing(3)}px;
`
