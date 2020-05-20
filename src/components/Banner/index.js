import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Container, Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'
import {
  BannerWrapper,
  BannerLabel,
  BannerContent,
  CloseButton,
  CloseIcon,
  Row,
} from './styles'

export default function Banner({
  bgImage,
  children,
  label,
  hasCloseButton,
  onClose,
  justify,
  size,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    isOpen && (
      <div>
        {hasCloseButton && (
          <CloseButton
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="banner"
            data-gtm-name="botao fechar"
            onClick={() => {
              setIsOpen(false)

              if (onClose) {
                onClose()
              }
            }}
          >
            <CloseIcon name="close" />
          </CloseButton>
        )}
        <BannerWrapper image={bgImage} size={size} {...rest}>
          <Container>
            <Row justify={justify}>
              <Col lg={size === 'sm' ? 12 : 10} sm={12} xs={12}>
                {!!label && <BannerLabel>{label}</BannerLabel>}
                <BannerContent>{children}</BannerContent>
              </Col>
            </Row>
          </Container>
        </BannerWrapper>
      </div>
    )
  )
}

Banner.defaultProps = {
  bgImage: null,
  label: null,
  size: 'sm',
  hasCloseButton: false,
  justify: 'flex-start',
  onClose: null,
}

Banner.propTypes = {
  bgImage: PropTypes.string,
  children: PropTypes.node.isRequired,
  hasCloseButton: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  justify: PropTypes.oneOf(['flex-start', 'flex-end', 'center']),
  onClose: PropTypes.func,
}
