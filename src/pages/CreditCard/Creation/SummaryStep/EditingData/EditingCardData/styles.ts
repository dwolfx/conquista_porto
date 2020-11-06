import styled from 'styled-components'

import ButtonComponent from 'components/Button'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div + div {
    margin-top: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const Button = styled(ButtonComponent)`
  width: 100%;
`

export const SelectWrapper = styled.div`
  width: 100%;
`
