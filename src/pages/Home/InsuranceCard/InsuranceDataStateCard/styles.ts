import styled from 'styled-components'

import ButtonComponent from 'components/Button'

export const Button = styled(ButtonComponent)`
  margin: 0 ${({ theme }) => `${theme.spacing(2)}px`};
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
