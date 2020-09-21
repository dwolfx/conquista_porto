import styled from 'styled-components'

import ButtonCmp from 'components/Button'
import ButtonLinkComponent from 'components/Button/Link'
import CarouselCardComponent from 'components/Card/CarouselCard'
import TextComponent from 'components/Text'

export const CarouselCard = styled(CarouselCardComponent)`
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
`

export const Content = styled.div`
  width: 100%;
`

export const PieChartContainer = styled.div`
  height: 236px;
  width: 236px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(8)}px;

  @media all and (-moz-images-in-menus: 0) {
    height: -webkit-fill-available;
    height: -moz-available;
  }

  & > div {
    height: 329px;
  }

  /* Vertical Tablet = 736px Up */
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-top: ${({ theme }) => theme.spacing(6)}px;
  }

  /* Desktop = 1280px Up */
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    margin-top: ${({ theme }) => theme.spacing(10)}px;
  }
`

export const TitleWrapper = styled.div`
  height: 21px;
  display: flex;
  align-items: center;

  & > span {
    display: flex;
    height: 21px;
    margin-left: ${({ theme }) => theme.spacing(1)}px;
  }

  /* Vertical Tablet = 736px Up */
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    height: 25px;
    justify-content: center;
  }
`

export const VerticalListWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing(2)}px;

  & > div + div {
    margin-top: ${({ theme }) => theme.spacing(1)}px;
  }
`

export const HorizontalListWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing(2)}px;
`

export const Button = styled(ButtonCmp)`
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing(1)}px`} 0;

  /* Vertical Tablet = 736px Up */
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin: 0px;

    & + & {
      margin-left: ${({ theme }) => theme.spacing(2)}px;
    }
  }

  /* Horizontal Tablet = 980px Up */
  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    & + & {
      margin: ${({ theme }) => `${theme.spacing(2)}px 0 0`};
    }
  }
`

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => `${theme.spacing(2)}px`};
  margin-top: ${({ theme }) => theme.spacing(11)}px;

  /* Vertical Tablet = 736px Up */
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    flex-direction: unset;
    margin-top: ${({ theme }) => theme.spacing(27)}px;

    button:first-child {
      & > span {
        padding: 0 ${({ theme }) => theme.spacing(2)}px;
      }
    }
  }

  /* Horizontal Tablet = 980px Up */
  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    flex-direction: column;
    margin-top: ${({ theme }) => theme.spacing(13)}px;
  }

  /* Desktop = 1280px Up */
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    margin-top: ${({ theme }) => theme.spacing(22)}px;
  }
`

export const PieMiddleContentTitle = styled(TextComponent)`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

export const PieItemMargin = styled.div`
  margin: ${({ theme }) => theme.spacing(1)}px;
`

export const EmptyBody = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

export const ButtonLink = styled(ButtonLinkComponent)`
  & > svg {
    margin-left: 0;
  }
`
