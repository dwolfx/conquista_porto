import React from 'react'
import * as s from './styles'
import { Container, Col, Row } from 'styled-bootstrap-grid'
import Radio from 'components/Inputs/Radio'
import { useState } from 'react'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'
import Popover from 'components/Popover'

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

const MotocicleQuestion = () => {
  const [isAnswerPositive, setIsAnswerPositive] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isMobile = useMedia('md')

  const handleChange = (value: string) => {
    setIsAnswerPositive(value)
  }

  return (
    <s.ContentWrapper>
      <Container>
        <Row justifyContent="center">
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
          <Col lg={1} md={1} hiddenSmDown />
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
              >
                Simular
              </s.SimulateButton>
            </s.ContentWrapper>
          </Col>
        </Row>
      </Container>
    </s.ContentWrapper>
  )
}

export default MotocicleQuestion
