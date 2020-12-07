import styled from 'styled-components'
import BaseCard from 'components/Card'
import { CardBody } from 'components/Card/styles'

export const Card = styled(BaseCard)`
  ${CardBody} {
    flex-direction: row;
  }
`

export const Thumbnail = styled.div<{ hasError?: boolean }>`
  background: ${({ theme, hasError }) => hasError ? theme.colors.gray1 : theme.colors.green2};
  width: 47px;
  height: 47px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Info = styled.div`
  padding-left: ${({ theme }) => theme.spacing(2)}px;
`
