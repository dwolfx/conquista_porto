import styled from 'styled-components'
import { Row as RowBootstrap } from 'styled-bootstrap-grid'
import { LoadingContainer } from 'components/Loading/styles'
import BackgroundImage from 'components/Card/BackgroundImage'

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
  margin: ${({ theme }) => `${theme.spacing(3)}px 0 ${theme.spacing(4)}px`};

  p {
    display: flex;

    svg {
      margin-left: ${({ theme }) => theme.spacing(1)}px;
    }
  }
`
