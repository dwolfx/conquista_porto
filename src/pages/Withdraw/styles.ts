import styled from 'styled-components'
import { Container as ContainerBootstrap } from 'styled-bootstrap-grid'

import Card from 'components/Card'

export const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`

export const Container = styled(ContainerBootstrap)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

export const FullHeightCard = styled(Card)`
  height: 100%;
`
