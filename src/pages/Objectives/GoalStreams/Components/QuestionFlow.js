import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'styled-bootstrap-grid'
import InputText from 'components/NewInput'
import RadioInput from 'components/Inputs/Radio'

import { Question, Wrapper } from './styles'

const QuestionFlow = ({
  formData,
  minimumValue,
  name,
  onChangeFormData,
  options,
  question,
  type,
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
          {type === 'text' && (
            <InputText
              name={name}
              onChange={onChangeFormData}
              prefix="#"
              value={formData[name] || ''}
            />
          )}
          {type === 'number' && (
            <InputText
              minimumValue={minimumValue}
              name={name}
              onChange={onChangeFormData}
              prefix="R$"
              value={formData[name] || ''}
            />
          )}
          {type === 'date' && (
            <InputText
              minimumValue={minimumValue}
              name={name}
              onChange={onChangeFormData}
              value={formData[name] || ''}
            />
          )}
          {type === 'bool' && (
            <RadioInput
              name={name}
              onChange={onChangeFormData}
              options={options}
            />
          )}
        </Wrapper>
      </Col>
    </Row>
  </>
)

QuestionFlow.defaultProps = {
  formData: {},
  minimumValue: '',
  name: '',
  onChangeFormData: () => {},
  options: [],
  question: '',
  type: '',
}

QuestionFlow.propTypes = {
  formData: PropTypes.object,
  minimumValue: PropTypes.string,
  name: PropTypes.string,
  onChangeFormData: PropTypes.func,
  options: PropTypes.array,
  question: PropTypes.string,
  type: PropTypes.string,
}

export default QuestionFlow
