import styled from 'styled-components'
import Button from 'components/Button'
import CarouselCard from 'components/Card/CarouselCard'

export const StyledCarousel = styled(CarouselCard)`
  height: 490px;
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};

  /* Vertical Tablet = 736px Up */
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    height: 458px;
  }

  /* Desktop = 1280px Up */
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    height: 518px;
  }

  .slick-track{
    height: calc(100% - 14px);
  }

  .slick-slide {
    height: 100%;
    > div {
      height: 100%;
    }
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`

export const ContentWrapper = styled.div`
  width: 100%;
  padding-top: 14px;

  div > span {
    height: ${({ theme }) => theme.spacing(3)}px;
  }
`
export const ManageButton = styled(Button).attrs(() => ({
  outline: true,
  color: "primary"
}))`
  width: 100%;
`

export const ButtonWrapper = styled.div`
  padding: ${({theme}) => `0 ${theme.spacing(2)}px`};
`

export const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-right: ${({theme}) => theme.spacing(2)}px;
  }
`
