/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { formatMoneyDecimal, formatDateMask } from 'helpers'
import Drawer from 'components/Drawer'
import InputText from 'components/NewInput'
import { PostObjectiveDataRequest } from 'store/modules/Objective/action'
import {
  ButtonBar,
  ButtonSubmit,
  ColInput,
  FormWrapper,
  IconLoading,
  SectionBar,
} from './styles'

const BottomBar = ({ goal, isLoading }) => {
  const {
    nickname,
    targetDate,
    targetValue,
    initialValue,
    monthlyValue,
    goalType,
  } = goal
  const history = useHistory()
  const dispatch = useDispatch()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [formData, setFormData] = useState({
    nickname,
    targetDate,
    targetValue,
    initialValue,
    monthlyValue,
    goalType,
  })

  const moneyMask = event => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    event.target.value = formatMoneyDecimal(strippedValue) // eslint-disable-line no-param-reassign
  }

  const handleSingleValue = event => {
    const { name } = event.target
    if (
      name === 'initialValue' ||
      name === 'monthlyValue' ||
      name === 'targetValue'
    )
      moneyMask(event)
    if (name === 'targetDate') formatDateMask(event)
    setFormData({ ...formData, [name]: event.target.value })
  }

  const submitDrawer = () => {
    dispatch(PostObjectiveDataRequest(formData))
    setIsDrawerOpen(!isDrawerOpen)
  }

  const footerDrawer = () => (
    <ButtonSubmit
      data-gtm-form="submit"
      data-gtm-name="confirmar e recalcular"
      onClick={() => submitDrawer()}
      disabled={isLoading}
    >
      Confirmar e recalcular {isLoading && <IconLoading />}
    </ButtonSubmit>
  )

  return (
    <SectionBar>
      <Drawer
        drawerTitle="resumo"
        isOpen={isDrawerOpen}
        handleClose={() => setIsDrawerOpen(false)}
        footer={footerDrawer()}
      >
        <FormWrapper data-gtm-type="form" data-gtm-name="resumo">
          <ColInput>
            <InputText
              data-gtm-form="input"
              data-gtm-name="apelido"
              name="nickname"
              prefix="#"
              label="Apelido"
              onChange={handleSingleValue}
              value={formData.nickname}
            />
          </ColInput>
          <ColInput>
            <InputText
              data-gtm-form="input"
              data-gtm-name="investimento inicial"
              name="initialValue"
              prefix="R$"
              label="Investimento inicial"
              onChange={handleSingleValue}
              value={formData.initialValue}
            />
          </ColInput>
          <ColInput>
            <InputText
              data-gtm-form="input"
              data-gtm-name="investimento mensal"
              name="monthlyValue"
              prefix="R$"
              label="Investimento mensal"
              onChange={handleSingleValue}
              value={formData.monthlyValue}
            />
          </ColInput>
          <ColInput>
            <InputText
              data-gtm-form="input"
              data-gtm-name="meta financeira"
              name="targetValue"
              prefix="R$"
              label="Meta financeira"
              onChange={handleSingleValue}
              value={formData.targetValue}
            />
          </ColInput>
          <ColInput>
            <InputText
              data-gtm-form="input"
              data-gtm-name="data-alvo"
              name="targetDate"
              label="Data-alvo"
              onChange={handleSingleValue}
              value={formData.targetDate}
            />
          </ColInput>
        </FormWrapper>
      </Drawer>
      <Container>
        <Row justifyContent="end">
          <Col lgAuto>
            <ButtonBar
              data-gtm-subname="barra inferior"
              data-gtm-name="resumo"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              color="primary"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              Resumo
            </ButtonBar>
            <ButtonBar
              data-gtm-subname="barra inferior"
              data-gtm-name="continuar"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              color="secondary"
              onClick={() =>
                history.push({
                  pathname: 'objetivos/gerenciar',
                  store: { pageRecommendation: true },
                })
              }
            >
              Continuar
            </ButtonBar>
          </Col>
        </Row>
      </Container>
    </SectionBar>
  )
}

BottomBar.defaultProps = {
  goal: {},
}

BottomBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  goal: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    targetDate: PropTypes.string.isRequired,
    targetValue: PropTypes.number.isRequired,
    initialValue: PropTypes.number.isRequired,
    monthlyValue: PropTypes.number.isRequired,
    goalType: PropTypes.string.isRequired,
  }),
}

export default BottomBar
