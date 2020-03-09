/* eslint-disable react/no-array-index-key */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import { Container, Row, Col } from 'styled-bootstrap-grid'

import { PostObjectiveManagementDataRequest } from 'store/modules/ObjectiveManagement/action'
import { ButtonBar, SectionBar } from './styles'

const BottomBar = ({ id, isDrawerOpen, setIsDrawerOpen }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.objectiveManagement.isLoading)

  const submitToManagement = () => {
    function pushHistory(path) {
      history.push({ pathname: path, state: { pageRecommendation: true } })
    }
    dispatch(PostObjectiveManagementDataRequest({ id, pushHistory }))
  }

  return (
    <SectionBar>
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
              isLoading={isLoading}
              disabled={isLoading}
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
  id: PropTypes.string.isRequired,
  isDrawerOpen: PropTypes.bool,
  setIsDrawerOpen: PropTypes.func,
}

export default BottomBar
