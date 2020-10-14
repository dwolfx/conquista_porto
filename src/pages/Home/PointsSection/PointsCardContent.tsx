import React from 'react'

import { formatMoney } from 'helpers'

import { IRecommendationCardProps } from './types'
import * as s from './styles'

const PointsCardContent = ({
  hasCreditCard,
  offer,
  ...rest
}: Omit<IRecommendationCardProps, 'cardTitle' | 'cardIcon'>) => (
  <s.OfferBox {...rest}>
    <s.OfferImageBox>
      <img src={offer.image} alt={`${offer.exchangeProduct} pic`} />
      {offer.type && (
        <s.OfferCategoryBox>
          <s.OfferCategoryText type="subheading">
            {offer.type}
          </s.OfferCategoryText>
        </s.OfferCategoryBox>
      )}
    </s.OfferImageBox>
    <s.OfferWrapper>
      <s.OfferTitle bold>{offer.exchangeProduct}</s.OfferTitle>
      {hasCreditCard ? (
        <s.OfferText>
          {Intl.NumberFormat().format(offer.points)} pontos você pode trocar por{' '}
          {offer.exchangeProduct}
        </s.OfferText>
      ) : (
        <s.OfferText>
          {Intl.NumberFormat().format(offer.points)} pontos você troca por{' '}
          {formatMoney(offer.exchangeValue || 0)} no {offer.exchangeProduct}
        </s.OfferText>
      )}
    </s.OfferWrapper>
  </s.OfferBox>
)

export default PointsCardContent
