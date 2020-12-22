import React, { useState } from 'react'
import { Col } from 'styled-bootstrap-grid'
import Radio from 'components/Inputs/Radio'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'
import Popover from 'components/Popover'

import StepBar from 'pages/TripInsurance/commons/StepBar'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'

import * as s from './styles'
import { Steps } from '../types'

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
  // Olhar depois os SETTERS ==========================
  const [isLoading] = useState<boolean>(false)
  // Olhar depois os SETTERS ==========================

  const [isAnswerPositive, setIsAnswerPositive] = useState<string>()

  const isMobile = useMedia('md')

  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  const handleChange = (value: string) => {
    setIsAnswerPositive(value)
  }

  return (
    <s.ContentWrapper>
      <StepBar actualStep={5} totalNumberOfSteps={5} />
      <s.ContentContainer>
        <s.ContentRow justifyContent={isMobile ? 'center' : 'start'}>
          <Col lg={3} md={3} hiddenMdDown>
            <s.ContentWrapper>
              <s.TitleInfo type="heading4" bold>
                Cobertura
              </s.TitleInfo>
              <s.DivisorInfo />
              <Text type="headline">
                Eventos decorrentes de acidentes com motocicletas na América
                Latina não tem cobertura.
              </Text>
            </s.ContentWrapper>
          </Col>
          <Col lg={1} md={1} hiddenMdDown />
          <Col lg={4} md={4} sm={6}>
            <s.ContentWrapper>
              <s.QuestionText textAlign="center" type="headline">
                Pretende usar motocicleta durante a viagem?
                {isMobile ? (
                  <Popover
                    content={() => (
                      <s.TooltipText type="body" color="gray5">
                        Eventos decorrentes de acidentes com motocicletas na
                        América Latina não tem cobertura.
                      </s.TooltipText>
                    )}
                    placement="top"
                  >
                    <s.InfoIcon name="information" color="blue4" />
                  </Popover>
                ) : null}
              </s.QuestionText>
              <Radio
                options={radioOptions}
                itemsDirection="column"
                itemsAlign="center"
                checkedItem={isAnswerPositive}
                onChange={e => handleChange(e.currentTarget.value)}
              />
              <s.SimulateButton
                disabled={isAnswerPositive === undefined}
                loading={isLoading}
                color="secondary"
                onClick={() => instantiate(Steps.choosePlan)}
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
