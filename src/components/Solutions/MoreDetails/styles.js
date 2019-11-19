import styled from 'styled-components'
import CarouselGeneric from '../../Carousel'

export const InvestmentsCarouselWrapper = styled.section`
  padding: 1.75em 0;
  margin: 0 auto;
  max-width: 75em;
  width: 100%;
`

export const TitleHeader = styled.h1`
  font-size: 11px;
  font-weight: 600;
  line-height: 21px;
  text-align: center;
  margin-bottom: 14px;
`

export const Carousel = styled(CarouselGeneric)`
  .slick-dots {
    position: relative;
    bottom: 0;
    margin: 1em 0 0;
  }
`
