import React, { useState } from 'react'

import BannerImg from 'assets/images/pages/Home/img_banner_12.png'
import Text from 'components/Text'

import {
  BannerButton,
  BannerTips,
  CloseButton,
  CloseIcon,
  GridRow,
  GridCol,
} from './styles'

const AdvertisementBanner = ({ hasCloseButton }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    isOpen && (
      <GridRow style={{ paddingRight: 7, paddingLeft: 7, marginBottom: 30 }}>
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
              segurança case você precise ficar afastado do trabalho e, na sua
              falta, garantir amparo financeiro a sua família.
            </Text>
            <BannerButton>CONHEÇA</BannerButton>
          </BannerTips>
        </GridCol>
      </GridRow>
    )
  )
}

export default AdvertisementBanner
