import styled from 'styled-components'
import { Col } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import Text from 'components/Text'
import { rgba } from 'helpers'

export const OfferBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const OfferImageBox = styled.div`
  border-radius: 8px;
  height: 230px;
  margin: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(3)}px 0`};
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`

export const OfferCategoryBox = styled.div`
  align-items: center;
  background-color: ${props => rgba(props.theme.colors.gray6, 0.63)};
  bottom: 0;
  display: flex;
  height: 35px;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
  position: absolute;
  width: 100%;
`

export const OfferCategoryText = styled(Text)`
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
`

export const OfferTextBox = styled.div`

  margin: ${({ theme }) => `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`};
`

export const OfferTitle = styled(Text)`
  color: ${props => props.theme.colors.gray6};
  margin-bottom: ${({ theme }) => `${theme.spacing(1)}px`};
`

export const OfferText = styled(Text).attrs(() => ({
  bold: true,
}))`
  color: ${props => props.theme.colors.gray5};
`

export const OfferCardButton = styled(Button)`
  width: 100%;
`
export const PointsCol = styled(Col)`
  @media ${props => props.theme.mediaQueries.md} {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }

  @media all and (-moz-images-in-menus: 0) {
    height: -webkit-fill-available;
    height: -moz-available;
  }
`
