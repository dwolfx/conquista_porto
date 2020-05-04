/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import {
  GetOtherGoalsDataRequest,
  PostObjectiveManagementDataRequest,
} from 'store/modules/ObjectiveManagement/action'
import { ButtonBar, SectionBar } from './styles'

const BottomBar = ({ recommendationData, isDrawerOpen, setIsDrawerOpen }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.objectiveManagement.isLoading)

  const [buttonConfirmClicked, setButtonConfirmClicked] = useState(false)

  const submitToManagement = () => {
    const data = {
      id: recommendationData.id,
      answer: recommendationData.answer,
      fund_total_income: recommendationData.fund_total_income,
      funds: recommendationData.funds,
      additional: recommendationData.additional,
      credit_product: recommendationData.credit_product,
    }

    setButtonConfirmClicked(true)
    function pushHistory(path) {
      history.push({ pathname: path, state: { pageRecommendation: true } })
    }
    dispatch(
      PostObjectiveManagementDataRequest({
        data,
        pushHistory,
        onSuccess: () =>
          dispatch(GetOtherGoalsDataRequest({ id: recommendationData.id })),
      })
    )
  }

  return (
    <SectionBar>
      <Container>
        <Row justifyContent="end">
          <Col lgAuto>
            <ButtonBar
              data-gtm-subname="barra inferior"
              data-gtm-name="editar objetivo"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              color="primary"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              Editar objetivo
            </ButtonBar>
            <ButtonBar
              data-gtm-subname="barra inferior"
              data-gtm-name="continuar"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              color="secondary"
              onClick={submitToManagement}
              loading={isLoading && buttonConfirmClicked}
              disabled={isLoading && buttonConfirmClicked}
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
  isDrawerOpen: false,
  setIsDrawerOpen: () => {},
}

BottomBar.propTypes = {
  recommendationData: PropTypes.shape({
    id: PropTypes.number,
    answer: PropTypes.object,
    fund_total_income: PropTypes.object,
    funds: PropTypes.array,
    additional: PropTypes.object,
    credit_product: PropTypes.object,
  }).isRequired,
  isDrawerOpen: PropTypes.bool,
  setIsDrawerOpen: PropTypes.func,
}

export default BottomBar
