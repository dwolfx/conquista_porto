import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'styled-bootstrap-grid'
import InputText from 'components/NewInput'
import RadioInput from 'components/Inputs/Radio'

import { ColQuestion, Question, RuleText, Wrapper } from './styles'

const QuestionFlow = ({
  formData,
  name,
  onChangeFormData,
  options,
  question,
  ruleText,
  type,
}) => (
  <>
    <Row justifyContent="center">
      <ColQuestion lg="12" xs="12">
        <Question>{question}</Question>
        {ruleText && <RuleText>{ruleText}</RuleText>}
      </ColQuestion>
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
              name={name}
              onChange={onChangeFormData}
              prefix="R$"
              value={formData[name] || ''}
            />
          )}
          {type === 'date' && (
            <InputText
              name={name}
              onChange={onChangeFormData}
              value={formData[name] || ''}
              maxLength="10"
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
  name: '',
  onChangeFormData: () => {},
  options: [],
  question: '',
  ruleText: '',
  type: '',
}

QuestionFlow.propTypes = {
  formData: PropTypes.object,
  name: PropTypes.string,
  onChangeFormData: PropTypes.func,
  options: PropTypes.array,
  question: PropTypes.string,
  ruleText: PropTypes.string,
  type: PropTypes.string,
}

export default QuestionFlow
