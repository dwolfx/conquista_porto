import styled from 'styled-components'

import Button from 'components/Button'

export const LoadingContainer = styled.div`
  max-width: 428px;
  margin: auto;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 434px;
  margin: auto;
`

export const TryAgainButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  margin-left: auto;
  margin-right: auto;
  width: 192px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`
export const HomeButton = styled(Button)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`
