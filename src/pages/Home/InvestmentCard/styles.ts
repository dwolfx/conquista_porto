import styled from 'styled-components'

import CarouselCardComponent from 'components/Card/CarouselCard'
import ButtonCmp from 'components/Button'

export const CarouselCard = styled(CarouselCardComponent)`
  height: calc(100% - 38px);
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
`

export const Content = styled.div`
  width: 100%;
`

export const PieChartContainer = styled.div`
  height: 320px;
  width: 236px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.spacing(4)}px 0;

  @media all and (-moz-images-in-menus: 0) {
    height: -webkit-fill-available;
    height: -moz-available;
  }
`

export const Button = styled(ButtonCmp)`
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing(1)}px`} 0;
`

export const Footer = styled.div`
  padding: 0 ${({ theme }) => `${theme.spacing(1)}px`};
  margin-top: 100px;
`
