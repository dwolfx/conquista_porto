import styled from 'styled-components'
import CarouselCardComponent from 'components/Card/CarouselCard'

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) =>
    `${theme.spacing(3)}px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`};
  height: 100%;
  width: 100%;
`
export const Title = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => `${theme.spacing(1)}px`};
`

export const Subtitle = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => `${theme.spacing(3)}px`};
`

export const CarouselCard = styled(CarouselCardComponent)`
  height: calc(100% - 38px);
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
`

export const GridColFlexCardCarrousel = styled(CarouselCard)`
  height: 252px;

  &:first-of-type {
    margin-bottom: ${props => `${props.theme.spacing(2)}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.lg} {
    width: 50%;
    height: 252px;

    &:first-of-type {
      margin-right: ${props => `${props.theme.spacing(2)}px`};
    }
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const WrapperError = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`
