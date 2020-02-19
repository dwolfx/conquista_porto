import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'styled-bootstrap-grid'
import InputText from 'components/NewInput'
import RadioInput from 'components/Inputs/Radio'
import DateInput from 'components/Inputs/DateInput'

import MoneyInput from 'components/Inputs/Money'
import { ColQuestion, Question, RuleText, InputWrapper } from './styles'

const OutterWrapper = ({ ruleText, question, children }) => (
  <>
    <Row justifyContent="center">
      <ColQuestion lg="12" xs="12">
        <Question>{question}</Question>
        {ruleText && <RuleText>{ruleText}</RuleText>}
      </ColQuestion>
    </Row>
    <Row justifyContent="center">
      <Col xs="12">
        <InputWrapper>{children}</InputWrapper>
      </Col>
    </Row>
  </>
)

OutterWrapper.propTypes = {
  question: PropTypes.string.isRequired,
  ruleText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const QuestionInput = forwardRef(
  (
    {
      formData,
      name,
      onChangeFormData,
      options,
      question,
      ruleText,
      type,
      error,
      prefix,
      maxLength
    },
    ref
  ) => {
    if (type === 'date') {
      return (
        <OutterWrapper question={question} ruleText={ruleText}>
          <DateInput
            ref={ref}
            name={name}
            onChange={onChangeFormData}
            value={formData[name]}
            error={error}
            newInput
          />
        </OutterWrapper>
      )
    }
    if (type === 'bool') {
      return (
        <OutterWrapper question={question} ruleText={ruleText}>
          <RadioInput
            name={name}
            onChange={onChangeFormData}
            options={options}
          />
        </OutterWrapper>
      )
    }

    if (type === 'number') {
      return (
        <OutterWrapper question={question} ruleText={ruleText}>
          <MoneyInput
            ref={ref}
            name={name}
            onChange={onChangeFormData}
            value={formData[name]}
            error={error}
            maxLength={maxLength}
          />
        </OutterWrapper>
      )
    }

    return (
      <OutterWrapper question={question} ruleText={ruleText}>
        <InputText
          ref={ref}
          name={name}
          onChange={onChangeFormData}
          prefix={prefix}
          value={formData[name]}
          error={error}
          maxLength={maxLength}
        />
      </OutterWrapper>
    )
  }
)

QuestionInput.defaultProps = {
  formData: {},
  name: '',
  onChangeFormData: () => {},
  options: [],
  question: '',
  ruleText: '',
  type: '',
  error: null,
  prefix: null,
}

QuestionInput.propTypes = {
  formData: PropTypes.object,
  name: PropTypes.string,
  onChangeFormData: PropTypes.func,
  options: PropTypes.array,
  question: PropTypes.string,
  ruleText: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
  prefix: PropTypes.string,
}

export default QuestionInput
