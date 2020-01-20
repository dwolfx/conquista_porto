import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'styled-bootstrap-grid'
import Input from 'components/Inputs/Text'
import DateInput from 'components/Inputs/DateInput'
import RadioInput from 'components/Inputs/Radio'

import { Question, Wrapper } from './styles'

const QuestionFlow = ({
  minimumValue,
  name,
  options,
  question,
  type,
  state,
  setState,
}) => {
  const handleSingleValue = event => {
    setState({ ...state, [event.target.name]: event.target.value })
  }
  return (
    <>
      <Row justifyContent="center">
        <Col lg="12" xs="12">
          <Question>{question}</Question>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col lg="12" xs="12">
          <Wrapper>
            {type === 'number' && (
              <Input
                width="100"
                name={name}
                isDynamicStyle
                onChange={handleSingleValue}
                value={state[name] ? state[name] : ''}
                inputType={type}
                minimumValue={minimumValue}
              />
            )}
            {type === 'text' && (
              <Input
                width="100"
                name={name}
                isDynamicStyle
                onChange={handleSingleValue}
                value={state[name] ? state[name] : ''}
                inputType={type}
              />
            )}
            {type === 'date' && (
              <DateInput
                width="100"
                name={name}
                isDynamicStyle
                onChange={handleSingleValue}
                value={state[name] ? state[name] : ''}
              />
            )}
            {type === 'bool' && (
              <RadioInput
                name={name}
                options={options}
                onChange={handleSingleValue}
              />
            )}
          </Wrapper>
        </Col>
      </Row>
    </>
  )
}

QuestionFlow.defaultProps = {
  minimumValue: '',
  name: '',
  options: [],
  question: '',
  setState: () => {},
  state: {},
  type: '',
}

QuestionFlow.propTypes = {
  minimumValue: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  question: PropTypes.string,
  setState: PropTypes.func,
  state: PropTypes.object,
  type: PropTypes.string,
}

export default QuestionFlow
