import styled from 'styled-components'
import BannerComponent from 'components/Banner'
import { Container } from 'styled-bootstrap-grid'

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

export const ObjectiveDetails = styled.div`
  width: 100%;
  height: 382px;
  background-color: #fff;
  border: 1px solid black;
  margin-bottom: 21px;
`

export const Wallet = styled.div`
  width: 100%;
  height: 1281px;
  background-color: #fff;
  border: 1px solid black;
  margin-bottom: 21px;
`

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.margin};
`

export const Recommendations = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 21px;

  && > div {
    width: calc(50% - 7px);
  }
`
