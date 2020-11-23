import React from 'react'
import * as s from './styles'
import { Container, Col, Row } from 'styled-bootstrap-grid'
import Radio from 'components/Inputs/Radio'
import { useState } from 'react'

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

const AdventureSports = () => {
  const [hasAdventureSports, setHasAdventureSports] = useState<string>()

  const handleChange = (value: string) => {
    setHasAdventureSports(value)
  }

  return (
    <s.ContentWrapper>
      <Container>
        <Row justifyContent="center">
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
              >
                PRÓXIMO
              </s.NextButton>
            </s.ContentWrapper>
          </Col>
        </Row>
      </Container>
    </s.ContentWrapper>
  )
}

export default AdventureSports
