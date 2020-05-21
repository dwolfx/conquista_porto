import styled from 'styled-components'
import { Col, Row } from 'styled-bootstrap-grid'

import Banner from 'components/Banner'
import Modal from 'components/Modal/ModalNew'

export const ProductBannerModal = styled(Modal)`
  margin: 0;
`

export const ProductBannerContent = styled.div`
  width: 700px;

  @media ${props => props.theme.mediaQueries.sm} {
    width: auto;
  }
`
export const ProductBanner = styled(Banner)`
  color: ${props => props.theme.colors.white};

  &:before {
    opacity: 0.65;
  }
  @media ${props => props.theme.mediaQueries.md} {
    &:first-of-type {
      margin-bottom: 30px;
    }
  }
`

export const ProductBannerItemsContainer = styled(Row)`
  flex-wrap: wrap;

  @media ${props => props.theme.mediaQueries.sm} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export const ProductBannerItem = styled(Col)`
  display: flex;
  align-items: center;
  border-right: 1px solid ${props => props.theme.colors.gray2};
  flex-direction: column;
  height: 150px;
  margin: 17.5px 0;
  padding: 0 37px;
  text-align: center;

  &:nth-child(3n),
  &:last-child {
    border-right: none;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    width: auto;
  }
`
