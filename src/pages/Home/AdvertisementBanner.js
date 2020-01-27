import React, { useState } from 'react'

import BannerImg from 'assets/images/pages/Home/img_banner_12.png'
import Text from 'components/Text'

import {
  BannerButton,
  BannerTips,
  CloseButton,
  CloseIcon,
  GridCol,
  AdRow,
} from './styles'

const AdvertisementBanner = ({ onRedirect, hasCloseButton }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    isOpen && (
      <AdRow>
        <GridCol lg="12">
          {hasCloseButton && (
            <CloseButton onClick={() => setIsOpen(false)}>
              <CloseIcon name="close" />
            </CloseButton>
          )}
          <BannerTips size="lg" image={BannerImg}>
            <Text type="heading3">
              Viva hoje.
              <br /> Amanhã é com a gente
            </Text>
            <Text>
              O Seguro de Vida é uma maneira de proporcionar tranquilidade e
              segurança caso você precise ficar afastado do trabalho e, na sua
              falta, garantir amparo financeiro a sua família.
            </Text>
            <BannerButton
              color="secondary"
              onClick={() => onRedirect('/seguro-vida')}
            >
              CONHEÇA
            </BannerButton>
          </BannerTips>
        </GridCol>
      </AdRow>
    )
  )
}

export default AdvertisementBanner
