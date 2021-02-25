import styled from 'styled-components'
import { Container as ContainerBootstrap } from 'styled-bootstrap-grid'

import ButtonIcon from 'components/Button/Icon'
import CardCmp from 'components/Card'
import LayerCmp from 'components/Layer'
import { LayerHeader } from 'components/Layer/styles'
import { RiskColorTag as RiskColor } from 'pages/Objectives/Recommendation/WalletSection/styles'
import { CardBody } from 'components/Card/styles'

export const Layer = styled(LayerCmp)`
  ${LayerHeader} {
    padding: 0;
  }
`

export const Container = styled(ContainerBootstrap)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: ${({ theme }) => theme.spacing(0.5)}px;
  }
`

export const Card = styled(CardCmp)`
  min-height: 500px;
  height: calc(100vh - 250px);
  ${CardBody} {
    overflow: auto;
  }
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
  left: 4px;
  position: absolute;
  top: 3px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    left: -34px;
  }
  @media ${({ theme }) => theme.mediaQueries.xs} {
    left: 4px;
  }
`

export const FabButton = styled(ButtonIcon)`
  border: none;
  border-radius: 50%;
  bottom: 14px;
  position: fixed;
  right: 14px;
  z-index: 11;
`
