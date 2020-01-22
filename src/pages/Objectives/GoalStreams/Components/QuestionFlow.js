import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'styled-bootstrap-grid'
import Input from 'components/Inputs/Text'
import InputGroup from 'components/InputGroup'

import { Question, Wrapper } from './styles'

const QuestionFlow = ({ minimumValue, name, options, question, type }) => (
  <>
    <Row justifyContent="center">
      <Col lg="12" xs="12">
        <Question>{question}</Question>
      </Col>
    </Row>
    <Row justifyContent="center">
      <Col lg="12" xs="12">
        <Wrapper>
          <InputGroup
            iconPosition="left"
            content={(type === 'text' && '#') || (type === 'number' && 'R$')}
          >
            <Input
              width="100"
              label={type}
              minimumValue={minimumValue}
              name={name}
              options={options}
            />
          </InputGroup>
        </Wrapper>
      </Col>
    </Row>
  </>
)

QuestionFlow.defaultProps = {
  minimumValue: '',
  name: '',
  options: [],
  question: '',
  type: '',
}

QuestionFlow.propTypes = {
  minimumValue: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  question: PropTypes.string,
  type: PropTypes.string,
}

export default QuestionFlow
