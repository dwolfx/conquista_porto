import React, { useState } from 'react'
import { Col } from 'styled-bootstrap-grid'

import Radio from 'components/Inputs/Radio'
import StepBar from 'pages/TripInsurance/commons/StepBar'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import DivisorDescription from 'pages/TripInsurance/commons/DivisorDescription'

import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'
import { Steps, IForm } from '../types'

import * as s from './styles'

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
  const [hasAdventureSports, setHasAdventureSports] = useState<string>('')

  const { updateForm } = useFormFluxManagement<IForm>()
  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  const handleClick = () => {
    updateForm({ isPraticaAventura: !!+hasAdventureSports })
    instantiate(Steps.motocicleQuestion)
  }

  return (
    <s.ContentWrapper>
      <StepBar actualStep={4} totalNumberOfSteps={5} />
      <s.ContentContainer>
        <s.RowContainer
          alignItems="center"
          mdJustifyContent="start"
          smJustifyContent="center"
        >
          <Col lg={3} md={3} hiddenMdDown>
            <DivisorDescription
              title="Cobertura"
              text="O seguro cobre acidentes causados pela prática de esportes de aventura."
            />
          </Col>
          <Col lg={1} md={1} hiddenMdDown />
          <Col lg={4} md={4} sm={6}>
            <s.ContentWrapper>
              <s.QuestionText textAlign="center" type="headline">
                Você pretende praticar esportes de aventura durante a viagem?
              </s.QuestionText>
              <Radio
                options={radioOptions}
                itemsDirection="column"
                itemsAlign="center"
                checkedItem={hasAdventureSports}
                onChange={e => setHasAdventureSports(e.currentTarget.value)}
                data-testid="radio-input-adventure-sports"
              />
              <s.NextButton
                disabled={hasAdventureSports === ''}
                data-testid="button-adventure-sports"
                data-gtm-subname="botao proximo step"
                data-gtm-name="botao proximo"
                data-gtm-type="click"
                data-gtm-clicktype="button"
                onClick={() => handleClick()}
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
