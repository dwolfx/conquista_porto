import styled from 'styled-components'

import Card from 'components/Card'
import Layer from 'components/Layer'
import { LayerHeader } from 'components/Layer/styles'

import {
  Container as ContainerBootstrap,
  Col as ColBootstrap,
} from 'styled-bootstrap-grid'


export const LayerStyled = styled(Layer)`
  ${LayerHeader} {
    display: block;
    padding: 0;
  }
`

export const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`

export const Container = styled(ContainerBootstrap)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: 0;
  }
`

export const CustomCol = styled(ColBootstrap)`
  height: calc(100vh - 192px);

  @media ${({ theme }) => theme.mediaQueries.xs} {
    height: auto;
    padding: 0;
  }
`

export const FullHeightCard = styled(Card)`
  height: 100%;
`
