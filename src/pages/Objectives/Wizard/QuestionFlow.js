import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'styled-bootstrap-grid'
import Inputs from 'components/Inputs/Text'

import { Container, Question, Wrapper } from './styles'

const QuestionFlow = ({ question, name, type, minimumValue }) => (
  <Container>
    <Row justifyContent="center">
      <Col lg="4" xs="12">
        <Question>{question}</Question>
      </Col>
    </Row>
    <Row justifyContent="center">
      <Col lg="4" xs="12">
        <Wrapper>
          <Inputs
            width="100"
            label={type}
            name={name}
            minimumValue={minimumValue}
          />
        </Wrapper>
      </Col>
    </Row>
  </Container>
)

QuestionFlow.defaultProps = {
  question: '',
  name: '',
  type: '',
  minimumValue: '',
}

QuestionFlow.propTypes = {
  question: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  minimumValue: PropTypes.string,
}

export default QuestionFlow
