/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import { formatMoney } from 'helpers'
import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'

import {
  GetOtherGoalsDataRequest,
  PostObjectiveManagementDataRequest,
} from 'store/modules/ObjectiveManagement/action'
import { IRecommendations } from 'store/modules/Objective/types'

import { ButtonBar, SectionBar } from './styles'

interface IProps {
  recommendationData: IRecommendations
  openDrawer: () => void
}

const BottomBar = ({ recommendationData, openDrawer }: IProps) => {
  const history = useHistory()
  const dispatch = useDispatch()

  useFetchCustomerProfile()

  const { isLoading, customerProfile } = useSelector((state: any) => ({
    isLoading: state.objectiveManagement.isLoading,
    customerProfile: state.customerProfile.data,
  }))

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
    function pushHistory(path: string) {
      history.push({ pathname: path, state: { pageRecommendation: true } })
    }
    dispatch(
      PostObjectiveManagementDataRequest({
        data: {
          ...data,
          answer: {
            ...data.answer,
            uf: customerProfile.customerState,
            initial_value: formatMoney(data.answer.initial_value, {
              currency: 'BRL',
              style: 'decimal',
            }),
            monthly_value: formatMoney(data.answer.monthly_value, {
              currency: 'BRL',
              style: 'decimal',
            }),
            target_value: formatMoney(data.answer.target_value, {
              currency: 'BRL',
              style: 'decimal',
            }),
          },
        },
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
          <Col xlAuto lgAuto mdAuto smAuto>
            <ButtonBar
              data-gtm-subname="barra inferior"
              data-gtm-name="editar objetivo"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              color="primary"
              onClick={openDrawer}
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

export default BottomBar
