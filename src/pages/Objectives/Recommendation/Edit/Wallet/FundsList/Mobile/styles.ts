import styled from 'styled-components'

import CardCmp from 'components/Card'
import { CardBody } from 'components/Card/styles'

export const Card = styled(CardCmp)`
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  }
  ${CardBody} {
    padding-top: ${({ theme }) => theme.spacing(2)}px;
    padding-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const FooterButtonWrapper = styled.div`
  flex-direction: column;
  padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(2)}px`};

  button {
    width: 100%;

    &:first-of-type {
      margin-bottom: ${({ theme }) => theme.spacing(1)}px;
    }
  }
`
