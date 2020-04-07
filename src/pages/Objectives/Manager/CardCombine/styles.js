import styled from 'styled-components'
import { Col, Row } from 'styled-bootstrap-grid'
import Banner from 'components/Banner'

export const ButtonContainer = styled.div`
  margin-top: 14px;
`

export const BannerTips = styled(Banner)`
  color: ${props => props.theme.colors.white};

  &:before {
    opacity: 0.65;
  }
`

export const RowBanner = styled(Row)``

export const ColBanner = styled(Col)`
  margin-bottom: 14px;
  &:last-child {
    margin-bottom: 0px;
  }
`
