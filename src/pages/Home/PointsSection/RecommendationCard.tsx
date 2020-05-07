import React from 'react'

import { FullHeightCard } from 'pages/Home/styles'
import { formatMoney } from 'helpers'

import { IRecommendationCardProps } from './types'
import * as s from './styles'

const RecommendationCard = ({
  offer,
  cardIcon,
  isMiscellaneous,
}: IRecommendationCardProps) => (
  <FullHeightCard
    headerIcon={cardIcon || 'tag'}
    headerTitle="Troque seus pontos"
  >
    <s.OfferBox>
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
      <s.OfferTextBox>
        <s.OfferTitle bold>{offer.exchangeProduct}</s.OfferTitle>
        {isMiscellaneous ? (
          <s.OfferText>
            {Intl.NumberFormat().format(offer.points)} pontos você pode trocar
            por {offer.exchangeProduct}
          </s.OfferText>
        ) : (
          <s.OfferText>
            {Intl.NumberFormat().format(offer.points)} pontos você troca por{' '}
            {formatMoney(offer.exchangeValue)} no {offer.exchangeProduct}
          </s.OfferText>
        )}
      </s.OfferTextBox>
    </s.OfferBox>
  </FullHeightCard>
)

export default RecommendationCard
