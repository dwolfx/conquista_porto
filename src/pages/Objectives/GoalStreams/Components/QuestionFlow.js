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
  formData,
  onChangeFormData,
}) => (
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
              onChange={onChangeFormData}
              value={formData[name]}
              minimumValue={minimumValue}
            />
          )}
          {type === 'text' && (
            <Input
              width="100"
              name={name}
              isDynamicStyle
              onChange={onChangeFormData}
              value={formData[name]}
            />
          )}
          {type === 'date' && (
            <DateInput
              width="100"
              name={name}
              isDynamicStyle
              onChange={onChangeFormData}
              value={formData[name]}
            />
          )}
          {type === 'bool' && (
            <RadioInput
              name={name}
              options={options}
              onChange={onChangeFormData}
            />
          )}
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
  onChangeFormData: () => {},
  formData: {},
  type: '',
}

QuestionFlow.propTypes = {
  minimumValue: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  question: PropTypes.string,
  onChangeFormData: PropTypes.func,
  formData: PropTypes.object,
  type: PropTypes.string,
}

export default QuestionFlow
