/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'

import {
  GetOtherGoalsDataRequest,
  PostObjectiveManagementDataRequest,
} from 'store/modules/ObjectiveManagement/action'
import { IRecommendations } from 'store/modules/Objective/types'

import { ButtonBar, SectionBar } from './styles'

interface IProps {
  recommendationData: IRecommendations
}

const BottomBar = ({ recommendationData }: IProps) => {
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
            initial_value: data.answer.initial_value,
            monthly_value: data.answer.monthly_value,
            target_value: data.answer.target_value,
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
        <Row justifyContent="end" alignItems="center">
          <Col auto>
            <ButtonBar
              data-gtm-subname="barra inferior"
              data-gtm-name="próximo"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              color="secondary"
              onClick={submitToManagement}
              loading={isLoading && buttonConfirmClicked}
              disabled={isLoading && buttonConfirmClicked}
            >
              Próximo
            </ButtonBar>
          </Col>
        </Row>
      </Container>
    </SectionBar>
  )
}

export default BottomBar
