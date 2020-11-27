import React from 'react'
import theme from 'styles/theme'
import * as s from './styles'

interface RatingStarsProps {
  rating: string
}

export default function RatingStars({ rating }: RatingStarsProps) {
  switch (rating) {
    case '1':
      return (
        <s.RatingStarsContainer>
          <s.RatingStar name="star" fill={theme.colors.green3} />
          <s.RatingStar name="star" fill={theme.colors.gray4} />
          <s.RatingStar name="star" fill={theme.colors.gray4} />
        </s.RatingStarsContainer>
      )
    case '2':
      return (
        <s.RatingStarsContainer>
          <s.RatingStar name="star" fill={theme.colors.green3} />
          <s.RatingStar name="star" fill={theme.colors.green3} />
          <s.RatingStar name="star" fill={theme.colors.gray4} />
        </s.RatingStarsContainer>
      )
    case '3':
      return (
        <s.RatingStarsContainer>
          <s.RatingStar name="star" fill={theme.colors.green3} />
          <s.RatingStar name="star" fill={theme.colors.green3} />
          <s.RatingStar name="star" fill={theme.colors.green3} />
        </s.RatingStarsContainer>
      )

    default:
      return (
        <s.RatingStarsContainer>
          <s.RatingStar name="star" fill={theme.colors.gray4} />
          <s.RatingStar name="star" fill={theme.colors.gray4} />
          <s.RatingStar name="star" fill={theme.colors.gray4} />
        </s.RatingStarsContainer>
      )
  }
}
