/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'

import Icon from 'components/IconExporter'

import {
  GridRow,
  FullHeightCard,
  InfoContent,
  CardContainer,
  SpacedText,
} from './styles'

const SectionTwo = ({ creditProduct }) => {
  const theme = useContext(ThemeContext)
  const { values } = creditProduct

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
            {values.map((item, index) => (
              <InfoContent key={index}>
                <SpacedText type="captionUppercase" color="gray5">
                  {item.name}
                </SpacedText>
                <SpacedText
                  type="headline"
                  color={item.checked ? 'green3' : 'gray6'}
                >
                  {item.value}
                  {item.checked && (
                    <Icon
                      name="check"
                      width="21px"
                      fill={theme.colors.green3}
                    />
                  )}
                </SpacedText>
                {item.info && (
                  <Icon
                    name="information"
                    width="21px"
                    fill={theme.colors.gray5}
                  />
                )}
              </InfoContent>
            ))}
          </CardContainer>
        </FullHeightCard>
      </Col>
    </GridRow>
  )
}

SectionTwo.propTypes = {
  creditProduct: PropTypes.object,
}

SectionTwo.defaultProps = {
  creditProduct: {},
}

export default SectionTwo
