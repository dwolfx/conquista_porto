/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import InsuranceHomeImg from 'assets/images/pages/Home/insurance1.jpg'
import Text from 'components/Text'

import {
  GridRow,
  SliderBox,
  SliderImageBox,
  SliderCaption,
  SliderTextBox,
  FullHeightCard,
} from './styles'

const SectionOne = () => (
  <GridRow>
    <Col lg="6">
      <FullHeightCard headerIcon="piechart" headerTitle="Combo">
        Combo
      </FullHeightCard>
    </Col>

    <Col lg="3">
      <FullHeightCard headerIcon="linechart" headerTitle="Rendimentos">
        Rendimentos
      </FullHeightCard>
    </Col>

    <Col lg="3">
      <FullHeightCard headerIcon="information" headerTitle="Por que?">
        <SliderBox>
          <SliderImageBox>
            <img src={InsuranceHomeImg} alt="home offer pic" />
            <SliderCaption>
              <Text type="captionUppercase" bold>
                Seguro de vida
              </Text>
            </SliderCaption>
          </SliderImageBox>
          <SliderTextBox>
            <Text type="title" bold>
              Suporte em todos os momentos
            </Text>
            <Text>
              Planeje a sua proteção ou da sua família e tenha tranquilidade
              para enfrentar adversidades e ainda conte com muitos benefícios.
            </Text>
          </SliderTextBox>
        </SliderBox>
      </FullHeightCard>
    </Col>
  </GridRow>
)

export default SectionOne
