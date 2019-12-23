import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import { BannerWrapper, BannerLabel, BannerContent } from './styles'

export default function Banner({ bgImage, children, label, size, ...rest }) {
  return (
    <BannerWrapper image={bgImage} size={size} {...rest}>
      <Container>
        <Row>
          <Col lg={size === 'sm' ? 12 : 6} offset={size === 'lg' ? 6 : 0}>
            {!!label && <BannerLabel>{label}</BannerLabel>}
            <BannerContent>{children}</BannerContent>
          </Col>
        </Row>
      </Container>
    </BannerWrapper>
  )
}

Banner.defaultProps = {
  bgImage: null,
  label: null,
  size: 'sm',
}

Banner.propTypes = {
  bgImage: PropTypes.string,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
}
