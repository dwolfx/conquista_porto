import React, { useState } from 'react'
import 'styled-components/macro'

import {
  BannerWrapper,
  BannerTitle,
  BannerContent,
  CloseButton,
  CloseIcon,
} from './styles'

interface IProps {
  bgImage?: string
  hasCloseButton?: boolean
  title?: string | React.ReactNode
  justify?: 'start' | 'end' | 'center'
  onClose?: () => void
}

const Banner: React.FC<IProps> = ({
  bgImage,
  children,
  title,
  hasCloseButton,
  onClose,
  justify = 'start',
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
      <BannerWrapper image={bgImage} {...rest}>
        <BannerContent>
          {typeof title === 'string' ? (
            <BannerTitle>{title}</BannerTitle>
          ) : (
            title
          )}
          {children}
        </BannerContent>
      </BannerWrapper>
    </>
  ) : null
}

export default Banner
