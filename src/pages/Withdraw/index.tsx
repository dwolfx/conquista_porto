import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import TransactionHeader from 'components/Header/TransactionsHeader'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import { GetSuitabilityInfoAndValidate } from 'store/modules/SuitabilityInfo/action'
import { GetWithdrawDetailsRequest } from 'store/modules/Withdraw/actions'

import Anbima from 'components/Anbima'

import AccountDetail from './AccountDetail'
import ExitModal from './ExitModal'
import MainContent from './MainContent'
import * as s from './styles'

const Withdraw = () => {
  const history = useHistory()
  const isMobile = useMedia('xs')
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const maxSteps = 4
  const [step, setStep] = useState<number>(1)

  const { id_cotista } = useSelector<any, any>(state => ({
    id_cotista: state.suitabilityInfo.data?.id_cotista,
  }))

  useEffect(() => {
    dispatch(GetSuitabilityInfoAndValidate(() => null, 'retirar', addToast))
  }, [dispatch, addToast])

  const getAccountDetail = useCallback(() => {
    if (id_cotista) {
      dispatch(GetWithdrawDetailsRequest())
    }
  }, [dispatch, id_cotista])

  useEffect(() => {
    getAccountDetail()
  }, [getAccountDetail])

  const onError = () => getAccountDetail()

  return (
    <>
      <ExitModal
        hasUnsavedChanges={true}
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
