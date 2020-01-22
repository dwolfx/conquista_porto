import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'styled-bootstrap-grid'
import InputText from 'components/InputGroup/Text'
import InputGroup from 'components/InputGroup'

import { Question, Wrapper } from './styles'

const QuestionFlow = ({ options, question, type }) => (
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
            addonPosition="left"
            content={(type === 'text' && '#') || (type === 'number' && 'R$')}
          >
            <InputText width="100" label={type} options={options} />
          </InputGroup>
        </Wrapper>
      </Col>
    </Row>
  </>
)

QuestionFlow.defaultProps = {
  options: [],
  question: '',
  type: '',
}

QuestionFlow.propTypes = {
  options: PropTypes.array,
  question: PropTypes.string,
  type: PropTypes.string,
}

export default QuestionFlow
