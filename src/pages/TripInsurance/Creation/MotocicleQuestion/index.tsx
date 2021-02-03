import React, { useState } from 'react'
import { Col } from 'styled-bootstrap-grid'
import Radio from 'components/Inputs/Radio'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'
import Popover from 'components/Popover'

import StepBar from 'components/StepBar'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import * as s from './styles'
import { IForm, Steps } from '../types'

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

const MotocicleQuestion: StepComponent = () => {
  const { updateForm, form } = useFormFluxManagement<IForm>()

  const [isAnswerPositive, setIsAnswerPositive] = useState<string>('')

  const isMobile = useMedia('md')

  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  const handleChange = (value: string) => {
    setIsAnswerPositive(value)
  }

  const submitButton = () => {
    updateForm({
      ...form,
      isMotocicleta: !!+isAnswerPositive,
    })
    instantiate(Steps.choosePlan)
  }

  return (
    <s.ContentWrapper>
      <StepBar
        title="Simulação"
        type="Seguro Viagem"
        actualStep={form.qtdPassagMaiorSetentaAnos !== 0 ? 4 : 5}
        totalNumberOfSteps={form.qtdPassagMaiorSetentaAnos !== 0 ? 4 : 5}
      />
      <s.ContentContainer>
        <s.ContentRow justifyContent={isMobile ? 'center' : 'start'}>
          <Col lg={3} md={3} hiddenMdDown>
            {form.hasLatinAmericaCountryAndOtherCountry ? null : (
              <s.ContentWrapper>
                <s.TitleInfo type="heading4" bold>
                  Cobertura
                </s.TitleInfo>
                <s.DivisorInfo />
                <Text type="headline">
                  Cobertura para eventos decorrentes de viagens de motocicleta.
                </Text>
              </s.ContentWrapper>
            )}
          </Col>
          <Col lg={1} md={1} hiddenMdDown />
          <Col lg={4} md={4} sm={6}>
            <s.ContentWrapper>
              <s.QuestionText
                textAlign="center"
                type="headline"
                hasLatinAmericaCountryAndOtherCountry={
                  !!form.hasLatinAmericaCountryAndOtherCountry
                }
              >
                Pretende usar motocicleta durante a viagem?
                {isMobile ? (
                  <Popover
                    content={() => (
                      <s.TooltipText type="body" color="gray5">
                        Cobertura para eventos decorrentes de viagens de
                        motocicleta.
                      </s.TooltipText>
                    )}
                    placement="top"
                  >
                    <s.InfoIcon name="information" color="blue4" />
                  </Popover>
                ) : null}
              </s.QuestionText>
              {form.hasLatinAmericaCountryAndOtherCountry ? (
                <s.LatinAmericaWarningText
                  bold
                  type="caption"
                  color="gray5"
                  textAlign="center"
                >
                  Não haverá cobertura para eventos decorrentes de viagens de
                  motocicleta nos países selecionados da América Latina.
                </s.LatinAmericaWarningText>
              ) : null}
              <Radio
                options={radioOptions}
                itemsDirection="column"
                itemsAlign="center"
                checkedItem={isAnswerPositive}
                onChange={e => handleChange(e.currentTarget.value)}
              />
              <s.SimulateButton
                disabled={!isAnswerPositive}
                color="secondary"
                onClick={submitButton}
                data-gtm-name="simular"
                data-gtm-type="click"
                data-gtm-clicktype="button"
              >
                Simular
              </s.SimulateButton>
            </s.ContentWrapper>
          </Col>
        </s.ContentRow>
      </s.ContentContainer>
    </s.ContentWrapper>
  )
}

export default MotocicleQuestion
