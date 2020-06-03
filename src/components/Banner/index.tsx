import React, { useState } from 'react'
import { Container, Col, Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import {
  BannerWrapper,
  BannerLabel,
  BannerContent,
  CloseButton,
  CloseIcon,
} from './styles'

interface IProps {
  bgImage?: string
  hasCloseButton?: boolean
  label?: string
  size?: 'sm' | 'lg'
  justify?: 'start' | 'end' | 'center'
  onClose?: () => void
}

const Banner: React.FC<IProps> = ({
  bgImage,
  children,
  label,
  hasCloseButton,
  onClose,
  justify = 'start',
  size = 'sm',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(true)

  return isOpen ? (
    <>
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
          <Row justifyContent={justify}>
            <Col lg={size === 'sm' ? 12 : 10} md={12} sm={12} xs={12}>
              {!!label && <BannerLabel>{label}</BannerLabel>}
              <BannerContent>{children}</BannerContent>
            </Col>
          </Row>
        </Container>
      </BannerWrapper>
    </>
  ) : null
}

export default Banner
