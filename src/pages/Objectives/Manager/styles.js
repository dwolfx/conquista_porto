import styled from 'styled-components'
import { Container, Row } from 'styled-bootstrap-grid'

import BannerComponent from 'components/Banner'
import Card from 'components/Card'

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

export const Wallet = styled(Row)`
  width: 100%;
  margin-bottom: 21px;
`

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.margin};
`

export const FullHeightCard = styled(Card)`
  height: 100%;
`

export const AccordionWrapper = styled.div``

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
