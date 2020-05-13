import styled from 'styled-components'
import Card from 'components/Card'
import Button from 'components/Button'

import { CardBody } from 'components/Card/styles'

export const CardStyled = styled(Card)`
  height: 100%;

  ${CardBody} {
    max-width: 1000px;
  }
`

export const StyledButton = styled(Button)`
  font-size: 11px;
  line-height: 15px;
  margin-right: ${props => props.theme.spacing(2)}px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`

export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const CheckboxContainer = styled.div`
  margin: ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(2)}px;
  display: flex;
`

export const ContentContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`

export const SummaryContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(1)}px 0;
`

export const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.blue4};

  &:hover {
    text-decoration: underline;
  }
`
