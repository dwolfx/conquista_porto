import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'styled-bootstrap-grid'
import moment from 'moment'
import 'styled-components/macro'

import TransactionHeader from 'components/Header/TransactionsHeader'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import { GetWithdrawDetailsRequest } from 'store/modules/Withdraw/actions'

import Anbima from 'components/Anbima'

import AccountDetail from './AccountDetail'
import ExitModal from './ExitModal'
import MainContent from './MainContent'
import * as s from './styles'

const Withdraw = () => {
  const history = useHistory()
  const { state: stateLocation } = useLocation()
  const isMobile = useMedia('xs')
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const maxSteps = 4
  const [step, setStep] = useState<number>(1)
  const [showPrompt, setShowPrompt] = useState<boolean>(true)

  const { withdrawDetails } = useSelector<any, any>(state => ({
    id_cotista: state.suitabilityInfo.data?.id_cotista,
    withdrawDetails: state.withdraw.detailsData,
  }))

  const getAccountDetail = useCallback(() => {
    if (!stateLocation?.accessFromButton) {
      dispatch(GetWithdrawDetailsRequest({}))
    }
  }, [dispatch, stateLocation])

  useEffect(() => {
    getAccountDetail()
  }, [getAccountDetail])

  useEffect(() => {
    if (
      Object.entries(withdrawDetails).length &&
      withdrawDetails.fechado_retirada
    ) {
      setShowPrompt(false)

      history.goBack()

      return () => {
        addToast({
          description: `Tente novamente amanhã a partir das ${moment(
            withdrawDetails.horario_inicio_permitido_retirada,
            'H:mm:ss'
          ).format('H:mm')}`,
          title: `Não é possivel fazer retirada após as ${moment(
            withdrawDetails.horario_fim_permitido_retirada,
            'H:mm:ss'
          ).format('H:mm')}`,
          type: 'error',
        })
      }
    }
  }, [withdrawDetails, addToast, history])

  const onError = () => getAccountDetail()

  return (
    <>
      <ExitModal
        hasUnsavedChanges={showPrompt}
        onConfirmation={() => history.push('')}
      />
      <TransactionHeader
        onBack={() =>
          step !== 1
            ? setStep(currentStep => currentStep - 1)
            : history.goBack()
        }
        onClose={() => history.push('/')}
        showBackButton={step !== 1}
        showStepsBar
        stepsBarProps={{
          title: 'Retirar',
          step,
          maxSteps,
          setStep,
        }}
      />
      <s.Container>
        <Row>
          {!isMobile && (
            <s.Col md={3}>
              <AccountDetail onError={onError} />
            </s.Col>
          )}
          <s.Col md={9}>
            <MainContent
              step={step}
              setStep={setStep}
              maxSteps={maxSteps}
              onError={onError}
              setPrompt={setShowPrompt}
            />
          </s.Col>
        </Row>
        <Row>
          <Anbima />
        </Row>
      </s.Container>
    </>
  )
}

export default Withdraw
