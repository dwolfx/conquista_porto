import styled from 'styled-components'
import { Container as ContainerBootstrap } from 'styled-bootstrap-grid'

import CardCmp from 'components/Card'
import LayerCmp from 'components/Layer'
import { LayerHeader } from 'components/Layer/styles'
import { RiskColorTag as RiskColor } from 'pages/Objectives/Recommendation/WalletSection/styles'

export const Layer = styled(LayerCmp)`
  ${LayerHeader} {
    padding: 0;
  }
`

export const Container = styled(ContainerBootstrap)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`

export const Card = styled(CardCmp)`
  min-height: 500px;
  height: calc(100vh - 250px);
`

export const InfoRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(1.5)}px;
  padding: 0 ${({ theme }) => theme.spacing(3)}px;
`

export const RiskColorTag = styled(RiskColor)`
  height: calc(100% - 6px);
  left: 0;
  position: absolute;
  top: 3px;
`
