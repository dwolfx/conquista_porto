import styled from 'styled-components'

import Button from 'components/Button'
import Card from 'components/Card'
import Loading from 'components/Loading'
import Text from 'components/Text'
import { LegendText } from 'components/Loading/styles'
import { CardBody } from 'components/Card/styles'
import { Content } from 'components/Button/styles'

export const ContainerCard = styled(Card)`
  height: 350px;
  padding: ${({ theme }) => `${theme.spacing(19)}px ${theme.spacing(35)}px`};

  ${CardBody} {
    align-items: center;
  }
`
export const LoadingStyled = styled(Loading)`
  ${LegendText} {
    text-align: center;
  }
`
export const ErrorText = styled(Text).attrs(() => ({
  type: 'headline',
  color: 'magenta2',
}))`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const ButtonStyled = styled(Button)`
  padding: 0 ${({ theme }) => theme.spacing(4)}px;
  width: 196px;
  ${Content} {
    padding: 0;
  }
`
