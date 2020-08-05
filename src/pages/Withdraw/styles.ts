import styled from 'styled-components'
import TextComponent from 'components/Text'
import AnbimaComponent from 'components/Anbima'

import {
  Container as ContainerBootstrap,
  Col as ColBootstrap,
} from 'styled-bootstrap-grid'

export const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`

export const Container = styled(ContainerBootstrap)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: 0;
  }
`

export const Col = styled(ColBootstrap)`
  height: calc(100vh - 192px);

  @media ${({ theme }) => theme.mediaQueries.md} {
    height: 100%;
    padding: 0;
  }
`

export const Text = styled(TextComponent)`
  margin: ${({ theme }) => `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`};

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0 ${({ theme }) => theme.spacing(3)}px;
  }
`

export const Anbima = styled(AnbimaComponent)`
  margin-top: 0;
`
