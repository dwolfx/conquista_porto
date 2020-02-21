/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { formatMoneyDecimal, formatDateMask } from 'helpers'
import Drawer from 'components/Drawer'
import InputText from 'components/NewInput'
import { PostObjectiveDataRequest } from 'store/modules/Objective/action'
import { PostObjectiveManagementDataRequest } from 'store/modules/ObjectiveManagement/action'
import {
  ButtonBar,
  ButtonSubmit,
  ColInput,
  FormWrapper,
  IconLoading,
  SectionBar,
} from './styles'

const BottomBar = ({
  answer,
  isLoading,
  id,
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({})

  useEffect(() => {
    setFormData({ ...answer })
  }, [answer])

  const moneyMask = event => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    event.target.value = formatMoneyDecimal(strippedValue) // eslint-disable-line no-param-reassign
  }

  const handleSingleValue = event => {
    const { name } = event.target
    if (
      name === 'initial_value' ||
      name === 'monthly_value' ||
      name === 'target_value'
    )
      moneyMask(event)
    if (name === 'target_date') formatDateMask(event)
    setFormData({ ...formData, [name]: event.target.value })
  }

  const submitToRecommendation = () => {
    dispatch(PostObjectiveDataRequest(formData))
    setIsDrawerOpen(!isDrawerOpen)
  }

  const footerDrawer = () => (
    <ButtonSubmit
      data-gtm-form="submit"
      data-gtm-name="confirmar e recalcular"
      onClick={() => submitToRecommendation()}
      disabled={isLoading}
    >
      Confirmar e recalcular {isLoading && <IconLoading />}
    </ButtonSubmit>
  )

  const submitToManagement = () => {
    function pushHistory(path) {
      history.push({ pathname: path, state: { pageRecommendation: true } })
    }
    dispatch(PostObjectiveManagementDataRequest({ id, pushHistory }))
  }

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
              name="initial_value"
              prefix="R$"
              label="Investimento inicial"
              onChange={handleSingleValue}
              value={formData.initial_value}
            />
          </ColInput>
          <ColInput>
            <InputText
              data-gtm-form="input"
              data-gtm-name="investimento mensal"
              name="monthly_value"
              prefix="R$"
              label="Investimento mensal"
              onChange={handleSingleValue}
              value={formData.monthly_value}
            />
          </ColInput>
          <ColInput>
            <InputText
              data-gtm-form="input"
              data-gtm-name="meta financeira"
              name="target_value"
              prefix="R$"
              label="Meta financeira"
              onChange={handleSingleValue}
              value={formData.target_value}
            />
          </ColInput>
          <ColInput>
            <InputText
              data-gtm-form="input"
              data-gtm-name="data-alvo"
              name="target_date"
              label="Data-alvo"
              onChange={handleSingleValue}
              value={formData.target_date}
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
              onClick={submitToManagement}
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
  answer: {},
  isDrawerOpen: false,
  setIsDrawerOpen: () => {},
}

BottomBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  answer: PropTypes.shape(
    {
      nickname: PropTypes.string,
      target_date: PropTypes.string,
      target_value: PropTypes.number,
      initial_value: PropTypes.number,
      monthly_value: PropTypes.number,
      goal_type: PropTypes.string,
    }.isRequired
  ),
  isDrawerOpen: PropTypes.bool,
  setIsDrawerOpen: PropTypes.func,
}

export default BottomBar
