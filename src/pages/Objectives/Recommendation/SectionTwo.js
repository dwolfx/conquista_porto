/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react'
import { Col } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'

import { formatMoney } from 'helpers'
import Icon from 'components/IconExporter'

import {
  GridRow,
  FullHeightCard,
  InfoContent,
  CardContainer,
  SpacedText,
} from './styles'

const SectionTwo = () => {
  const theme = useContext(ThemeContext)

  return (
    <GridRow>
      <Col lg="9">
        <FullHeightCard headerIcon="financial" headerTitle="Investimentos">
          Investimentos
        </FullHeightCard>
      </Col>

      <Col lg="3">
        <FullHeightCard headerIcon="carnew" headerTitle="Financiamento">
          <CardContainer>
            <InfoContent>
              <SpacedText type="captionUppercase" color="gray5">
                VALOR A CONTRATAR
              </SpacedText>
              <SpacedText type="headline">{formatMoney(20000)}</SpacedText>
            </InfoContent>
            <InfoContent>
              <SpacedText type="captionUppercase" color="gray5">
                PRÉ-APROVADO
              </SpacedText>
              <SpacedText type="headline" color="green3">
                {formatMoney(30000)}{' '}
                <Icon name="check" width="21px" fill={theme.colors.green3} />
              </SpacedText>
            </InfoContent>
            <InfoContent>
              <SpacedText type="captionUppercase" color="gray5">
                QUANTIDADE DE PARCELAS
              </SpacedText>
              <SpacedText type="headline">24 a 60</SpacedText>
            </InfoContent>
            <InfoContent>
              <SpacedText type="captionUppercase" color="gray5">
                TAXA DE JUROS
              </SpacedText>
              <SpacedText type="headline">
                1,5% a 2,5% a.m.{' '}
                <Icon
                  name="information"
                  width="21px"
                  fill={theme.colors.gray5}
                />
              </SpacedText>
            </InfoContent>
          </CardContainer>
        </FullHeightCard>
      </Col>
    </GridRow>
  )
}

export default SectionTwo
