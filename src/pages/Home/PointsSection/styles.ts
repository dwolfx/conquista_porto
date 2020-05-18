import styled from 'styled-components'

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
  margin-top: 14px;
  margin-bottom: 21px;
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
  padding: 0 14px;
  position: absolute;
  width: 100%;
`

export const OfferCategoryText = styled(Text)`
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
`

export const OfferTextBox = styled.div`
  margin: 0 14px 14px;
`

export const OfferTitle = styled(Text)`
  color: ${props => props.theme.colors.gray6};
  margin-bottom: 7px;
`

export const OfferText = styled(Text).attrs(() => ({
  bold: true,
}))`
  color: ${props => props.theme.colors.gray5};
`

export const OfferCardButton = styled(Button)`
  width: 100%;
`
