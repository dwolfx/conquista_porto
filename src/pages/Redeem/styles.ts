import styled from 'styled-components'

import Card from 'components/Card'
import Layer from 'components/Layer'
import AnbimaComponent from 'components/Anbima'
import { LayerHeader } from 'components/Layer/styles'
import Button from 'components/Button'
import Modal from 'components/Modal/ModalNew'

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

export const ModalInfoError = styled(Modal)`
  z-index: 14;
  > div + div {
    max-width: 600px;
  }
`

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ModalButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`

export const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`

export const Container = styled(ContainerBootstrap)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: 0;
    margin-bottom: 84px;
  }
`

export const CustomCol = styled(ColBootstrap)`
  height: calc(100vh - 192px);

  @media ${({ theme }) => theme.mediaQueries.lg} {
    height: auto;
  }
  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: 0;
  }
`

export const FullHeightCard = styled(Card)`
  height: 100%;
`

export const Anbima = styled(AnbimaComponent)`
  margin-top: 0;
`
