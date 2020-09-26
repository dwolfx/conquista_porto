import styled from 'styled-components'
import { Row as RowBootstrap } from 'styled-bootstrap-grid'
import { LoadingContainer } from 'components/Loading/styles'
import BackgroundImage from 'components/Card/BackgroundImage'
import LayerCmp from 'components/Layer'
import { LayerHeader } from 'components/Layer/styles'

export const CardBackgroundImage = styled(BackgroundImage)`
  height: 200px;
  cursor: default;
`

export const Row = styled(RowBootstrap)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const LoadingStateContainer = styled.div`
  align-items: center;
  display: flex;
  height: 474px;
  justify-content: center;

  ${LoadingContainer} {
    width: 428px;

    @media ${props => props.theme.mediaQueries.sm} {
      width: 100%;
    }
  }
`

export const ButtonContainerModal = styled.div`
  padding-top: 56px;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  button {
    width: 180px;

    &:last-of-type {
      margin-left: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`

export const TextInfoContainer = styled.div`
  margin-bottom: ${({ theme }) => `${theme.spacing(4)}px`};

  p {
    display: flex;

    svg {
      margin-left: ${({ theme }) => theme.spacing(1)}px;
    }
  }
`

export const Layer = styled(LayerCmp)`
  ${LayerHeader} {
    padding: 0;
    border-bottom: none;
  }
`

interface IFundsTableCardFooter {
  align?: 'flex-start' | 'center' | 'flex-end'
  justify?: 'flex-start' | 'center' | 'space-between' | 'flex-end'
}

export const FundsTableCardFooter = styled.div<IFundsTableCardFooter>`
  align-items: ${({ align }) => (align ? align : 'flex-start')};
  display: flex;
  justify-content: ${({ align }) => (align ? align : 'flex-start')};
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`
