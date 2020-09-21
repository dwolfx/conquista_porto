import styled from 'styled-components'

import ButtonComponent from 'components/Button'

export const Button = styled(ButtonComponent)`
  width: 100%;
  margin-top: ${({ theme }) => `${theme.spacing(3)}px`};
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: ${({ theme }) =>
    `${theme.spacing(3)}px ${theme.spacing(2)}px 0px ${theme.spacing(2)}px`};

  p {
    margin-top: ${({ theme }) => `${theme.spacing(4)}px`};
  }
`
