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

const BottomBar = ({ goal, isLoading }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [formData, setFormData] = useState({})

  useEffect(() => {
    setFormData({ ...goal })
  }, [goal])

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

  const submitToRecommendation = () => {
    dispatch(PostObjectiveDataRequest(formData))
    setIsDrawerOpen(!isDrawerOpen)
  }

  const footerDrawer = () => (
    <ButtonSubmit onClick={() => submitToRecommendation()} disabled={isLoading}>
      Confirmar e recalcular {isLoading && <IconLoading />}
    </ButtonSubmit>
  )

  const submitToManagement = () => {
    dispatch(PostObjectiveManagementDataRequest(formData))
  }

  console.log(submitToManagement)

  return (
    <SectionBar>
      <Drawer
        drawerTitle="Resumo"
        isOpen={isDrawerOpen}
        handleClose={() => setIsDrawerOpen(false)}
        footer={footerDrawer()}
      >
        <FormWrapper>
          <ColInput>
            <InputText
              name="nickname"
              prefix="#"
              label="Apelido"
              onChange={handleSingleValue}
              value={formData.nickname}
            />
          </ColInput>
          <ColInput>
            <InputText
              name="initialValue"
              prefix="R$"
              label="Investimento inicial"
              onChange={handleSingleValue}
              value={formData.initialValue}
            />
          </ColInput>
          <ColInput>
            <InputText
              name="monthlyValue"
              prefix="R$"
              label="Investimento mensal"
              onChange={handleSingleValue}
              value={formData.monthlyValue}
            />
          </ColInput>
          <ColInput>
            <InputText
              name="targetValue"
              prefix="R$"
              label="Meta financeira"
              onChange={handleSingleValue}
              value={formData.targetValue}
            />
          </ColInput>
          <ColInput>
            <InputText
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
              color="primary"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              Resumo
            </ButtonBar>
            <ButtonBar
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
