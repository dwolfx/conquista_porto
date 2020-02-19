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

const BottomBar = ({ answer, isLoading }) => {
  const {
    nickname,
    target_date,
    target_value,
    initial_value,
    monthly_value,
    goal_type,
  } = answer
  const history = useHistory()
  const dispatch = useDispatch()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [formData, setFormData] = useState({
    nickname,
    target_date,
    target_value,
    initial_value,
    monthly_value,
    goal_type,
  })

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
  answer: {},
}

BottomBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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
}

export default BottomBar
