import React from 'react'
import * as s from './styles'
import { Col } from 'styled-bootstrap-grid'
import Radio from 'components/Inputs/Radio'
import { useState } from 'react'
import StepBar from 'pages/TripInsurance/commons/StepBar'
import { Steps } from '../types'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'

const radioOptions = [
  {
    value: '0',
    name: 'Não',
  },
  {
    value: '1',
    name: 'Sim',
  },
]

const AdventureSports: StepComponent = () => {
  const [hasAdventureSports, setHasAdventureSports] = useState<string>()

  const { instantiate } = useStackFluxManagement<
    StepComponentProps
  >()

  const handleChange = (value: string) => {
    setHasAdventureSports(value)
  }

  return (
    <s.ContentWrapper>
      <StepBar actualStep={4} totalNumberOfSteps={5} />
      <s.ContentContainer>
        <s.RowContainer justifyContent="center" lgAlignItems="center">
          <Col lg={4} md={4} sm={6} alignSelf="center">
            <s.ContentWrapper>
              <s.QuestionText textAlign="center" type="headline">
                Você pretende praticar esportes de aventura durante a viagem?
              </s.QuestionText>
              <Radio
                options={radioOptions}
                itemsDirection="column"
                itemsAlign="center"
                checkedItem={hasAdventureSports}
                onChange={e => handleChange(e.currentTarget.value)}
                data-testid="radio-input-adventure-sports"
              />
              <s.NextButton
                disabled={hasAdventureSports === undefined}
                data-testid="button-adventure-sports"
                onClick={() => instantiate(Steps.motocicleQuestion)}
              >
                PRÓXIMO
              </s.NextButton>
            </s.ContentWrapper>
          </Col>
        </s.RowContainer>
      </s.ContentContainer>
    </s.ContentWrapper>
  )
}

export default AdventureSports
