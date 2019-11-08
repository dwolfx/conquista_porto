import Slider from 'react-slick'
import { ReactComponent as foward } from 'assets/icons/foward.svg'
import { ReactComponent as backward } from 'assets/icons/backward.svg'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from 'styled-components'

const lightBlue = '#8BD2FF'

export default Slider

export const FowardIcon = styled(foward)`
  height: 16px;
  width: 16px;
`

export const BackwardIcon = styled(backward)`
  height: 16px;
  width: 16px;
`

export const NextButton = styled.button`
  svg polyline {
    stroke-width: 9px;
    stroke: ${lightBlue};
  }

  &.slick-next::before {
    content: '';
  }
`
