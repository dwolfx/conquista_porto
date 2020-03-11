import styled from 'styled-components'
import { Container, Row } from 'styled-bootstrap-grid'

import BannerComponent from 'components/Banner'
import Card from 'components/Card'
import { LoadingContainer } from 'components/Loading/styles'

export const GridContainer = styled(Container)`
  padding: 35px 0;
`

export const ObjectiveHeader = styled.div`
  margin: 21px 0;
`

export const Banner = styled(BannerComponent)`
  p {
    margin-bottom: 7px;
  }

  p:last-of-type {
    margin-bottom: 14px;
  }
`

export const ObjectiveDetails = styled(Card)`
  width: 100%;
  margin-bottom: 21px;
`

export const WalletContainer = styled(Row)`
  width: 100%;
  margin: 0 0 21px;
`

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.margin};
`

export const FullHeightCard = styled(Card)`
  height: 100%;
`

export const AccordionContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => (props.margin ? props.margin : '0px')};
`

export const CardContent = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  padding: 35px 0 14px 0;
`

export const LoadingStateContainer = styled.div`
  align-items: center;
  display: flex;
  height: 474px;
  justify-content: center;

  ${LoadingContainer} {
    width: 428px;
  }
`

export const ButtonContainerModal = styled.div`
  padding-top: 56px;
  text-align: right;

  button {
    margin-left: 14px;
    width: 180px;
  }
`
