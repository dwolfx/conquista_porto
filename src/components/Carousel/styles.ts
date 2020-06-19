import Slider from 'react-slick'
import { ReactComponent as forward } from 'assets/icons/forward.svg'
import { ReactComponent as backward } from 'assets/icons/backward.svg'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from 'styled-components'

export const SliderCustomizable = styled(Slider)`
  .slick-track {
    float: left;
  }
`

export const ForwardIcon = styled(forward)`
  height: 16px;
  width: 16px;
`

export const BackwardIcon = styled(backward)`
  height: 16px;
  width: 16px;
`

export const ChangePageButton = styled.button`
  svg polyline {
    stroke-width: 9px;
    stroke: ${props => props.theme.colors.blue3};
  }

  &.slick-next::before,
  &.slick-prev::before {
    content: '';
  }
`
