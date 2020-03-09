import React from 'react'
import PropTypes from 'prop-types'

import { Topics } from './style'

const TopicsIconContent = ({ children }) => (
  <Topics settings={settings}>{children}</Topics>
)

TopicsIconContent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

const settings = {
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
}

export default TopicsIconContent
