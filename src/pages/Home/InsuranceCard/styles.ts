import styled from 'styled-components'

import CarouselCardComponent from 'components/Card/CarouselCard'

export const CarouselCard = styled(CarouselCardComponent)`
  height: 252px;

  &:first-of-type {
    margin-bottom: ${props => `${props.theme.spacing(2)}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.lg} {
    width: calc(50% - ${props => `${props.theme.spacing(1)}px`});
    height: 252px;

    &:first-of-type {
      margin-right: ${props => `${props.theme.spacing(2)}px`};
    }
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`
