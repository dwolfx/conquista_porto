import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'styled-bootstrap-grid'
import InputText from 'components/NewInputs/Text'
import InputGroup from 'components/InputGroup'
import DateInput from 'components/NewInputs/Date'
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
          <InputGroup
            prefix={(type === 'text' && '#') || (type === 'number' && 'R$')}
          >
            {type === 'text' && (
              <InputText
                name={name}
                onChange={onChangeFormData}
                value={formData[name]}
                width="100"
              />
            )}
            {type === 'number' && (
              <InputText
                minimumValue={minimumValue}
                name={name}
                onChange={onChangeFormData}
                value={formData[name]}
                width="100"
              />
            )}
            {type === 'date' && (
              <DateInput
                name={name}
                onChange={onChangeFormData}
                value={formData[name]}
                width="100"
              />
            )}
            {type === 'bool' && (
              <RadioInput
                name={name}
                onChange={onChangeFormData}
                options={options}
              />
            )}
          </InputGroup>
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
