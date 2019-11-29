import styled from 'styled-components'
import CarouselGeneric from 'components/Carousel/index'

export const CarouselWrapper = styled.section`
  padding: 1.75em 0;
  margin: 0 auto;
  max-width: 75em;
  width: 100%;
`

export const TitleHeader = styled.h1`
  font-size: 18px;
  font-weight: 300;
  line-height: 28px;
  text-align: center;
  margin-bottom: 1em;
`

export const Carousel = styled(CarouselGeneric)`
  .slick-dots {
    position: relative;
    bottom: 0;
    margin: 1em 0 0;
  }
`
