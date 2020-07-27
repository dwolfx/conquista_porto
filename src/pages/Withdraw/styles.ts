import styled from 'styled-components'
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

  @media ${({ theme }) => theme.mediaQueries.xs} {
    height: 100%;
    padding: 0;
  }
`
