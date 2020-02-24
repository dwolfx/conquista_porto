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
      maxLength,
    },
    ref
  ) => {
    if (type === 'date') {
      return (
        <OutterWrapper question={question} ruleText={ruleText}>
          <DateInput
            data-gtm-form="input"
            data-gtm-name={name}
            ref={ref}
            name={name}
            onChange={onChangeFormData}
            value={formData[name]}
            error={error}
            newInput
            placeholder="dd/mm/aaaa"
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
            data-gtm-form="input"
            data-gtm-name={name}
            ref={ref}
            name={name}
            onChange={onChangeFormData}
            value={formData[name]}
            error={error}
            maxLength={maxLength}
            placeholder="1.000,00"
          />
        </OutterWrapper>
      )
    }

    return (
      <OutterWrapper question={question} ruleText={ruleText}>
        <InputText
          data-gtm-form="input"
          data-gtm-name={name}
          ref={ref}
          name={name}
          onChange={onChangeFormData}
          prefix="#"
          value={formData[name]}
          error={error}
          maxLength={maxLength}
          placeholder="MeuObjetivo"
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
  maxLength: 20,
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
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default QuestionInput
