import styled, { css } from 'styled-components'

import NewInput from 'components/NewInput'

export const CreditCardInput = styled(NewInput)`
  & + div {
    margin-top: ${({ theme }) => theme.spacing(4)}px;
  }
  width: 631px;

  ${({ error, theme }) =>
    error &&
    css`
      margin-bottom: ${theme.spacing(7)}px;
    `}

  @media ${props => props.theme.mediaQueries.xs} {
    width: 100%;
  }
`
