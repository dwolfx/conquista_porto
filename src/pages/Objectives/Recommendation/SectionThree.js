/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import TipBannerImg from 'assets/images/pages/Home/img_banner_6.png'
import Text from 'components/Text'

import { BannerTips, GridRow } from './styles'

const SectionThree = () => (
  <GridRow>
    <Col lg="6">
      <BannerTips label="Dicas para economizar" image={TipBannerImg}>
        <Text type="heading3">Vai viajar?</Text>
        <Text>Como você pretende controlar se não sabe onde ele está?</Text>
      </BannerTips>
    </Col>

    <Col lg="6">
      <BannerTips label="Dicas para economizar" image={TipBannerImg}>
        <Text type="heading3">Vai viajar?</Text>
        <Text>Como você pretende controlar se não sabe onde ele está?</Text>
      </BannerTips>
    </Col>
  </GridRow>
)

export default SectionThree
