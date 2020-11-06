import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import 'styled-components/macro'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import Layer from 'components/Layer'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import { truncateString } from 'helpers'

import { baseURLNamespaceInvestAws, post } from 'services/api'
import {
  GetCreditCardExpirationDaysRequest,
  GetCreditCardExpirationDaysClearData,
} from 'store/modules/CreditCard/ExpirationDays/action'

import ClientInfoStep from './ClientInfoStep'
import AddicionalInfoStep from './AddicionalInfoStep'
import CreditCardStep from './CreditCardStep'
import SummaryStep from './SummaryStep'
import ConfirmationMessageStep from './ConfirmationMessageStep'

import { ICreditCardCreationPayload, IOrderResponse } from './types'
import {
  HeaderContent,
  LogoWrapper,
  CloseIcon,
  PreviousIcon,
  GridContainer,
  GridCol,
  GridRow,
  StepBar,
  GridRowStepBar,
  ColStepBar,
} from './styles'

interface IProps {
  isOpen: boolean
  handleClose: () => void
}
type steps = 1 | 2 | 3 | 4 | 5
const Creation = ({ isOpen, handleClose }: IProps) => {
  const dispatch = useDispatch()
  const isMobile = useMedia('xs')
  const { addToast } = useToast()

  const [step, setStep] = useState<steps>(1)
  const [formData, setFormData] = useState<ICreditCardCreationPayload>({})
  const [formResponse, setFormResponse] = useState<IOrderResponse>({})
  const [retrySubmit, setRetrySubmit] = useState<boolean>(false)
  const [submitErrorCount, setSubmitErrorCount] = useState(0)

  useEffect(() => {
    dispatch(GetCreditCardExpirationDaysRequest())
    return () => {
      dispatch(GetCreditCardExpirationDaysClearData())
    }
  }, [dispatch])

  const goBack = () => {
    if (step === 1) {
      return handleClose()
    }
    setStep(prevState => (prevState - 1) as steps)
  }

  const goNext = useCallback(
    (stepAnswers: ICreditCardCreationPayload) => {
      if (step < 5) {
        setStep(prevState => (prevState + 1) as steps)
      }

      setFormData(currentFormState => ({
        ...currentFormState,
        ...stepAnswers,
      }))
    },
    [step]
  )

  const getStepCount = () => {
    return [
      <Text color="gray4" type="title">
        {`ETAPA ${step} de 5`}
      </Text>,
    ]
  }

  const handlePostSubmit = useCallback(async () => {
    try {
      const { data } = await post(
        `${baseURLNamespaceInvestAws}/cartoes/solicitacao`,
        formData
      )

      if (data) {
        setFormResponse(data)
        goNext({})
      }
    } catch (error) {
      setRetrySubmit(true)
      setSubmitErrorCount(submitErrorCount + 1)
      addToast({
        type: 'error',
        title: 'Desculpe, ocorreu uma falha ao enviar a solicitação',
        description: JSON.parse(error.message)?.msg,
      })

      if (submitErrorCount + 1 === 3) {
        setFormResponse({})
        goNext({})
      }
    }
  }, [formData, goNext, addToast, submitErrorCount])

  // Each step goes here
  const content = [
    <ClientInfoStep onNextStep={goNext} />,
    <AddicionalInfoStep formData={formData} onNextStep={goNext} />,
    <CreditCardStep formData={formData} onNextStep={goNext} />,
    <SummaryStep
      formData={formData}
      setFormData={setFormData}
      onSubmit={handlePostSubmit}
      retrySubmit={retrySubmit}
    />,
    <ConfirmationMessageStep
      formData={formData}
      formOrderResponse={formResponse}
      hasError={submitErrorCount === 3}
      handleClose={handleClose}
    />,
  ]

  const getContent = () => {
    return content[step - 1]
  }

  return (
    <Layer
      data-testid="layer-credit-card-creation"
      isOpen={isOpen}
      handleClose={handleClose}
      headerContent={
        <GridContainer>
          <GridRow>
            <GridCol lg={12}>
              <HeaderContent>
                <PreviousIcon
                  data-gtm-subname="layer Investimentir"
                  data-gtm-name="botao voltar step"
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  onClick={() => goBack()}
                />
                <LogoWrapper>
                  <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
                </LogoWrapper>
                <CloseIcon
                  className="layer-close-button"
                  data-gtm-subname="botao fechar layer"
                  data-gtm-name="botao fechar"
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  onClick={handleClose}
                />
              </HeaderContent>
            </GridCol>
          </GridRow>
        </GridContainer>
      }
    >
      <StepBar step={step}>
        <GridContainer>
          <GridRowStepBar>
            <ColStepBar lg={12}>
              <HorizontalList
                size="small"
                startItems={[
                  <Text color="gray4" type="headline">
                    Solicitação
                  </Text>,
                  <Text color="white" type="headline">
                    {isMobile
                      ? truncateString('Cartão de Crédito', 11)
                      : 'Cartão de Crédito'}
                  </Text>,
                ]}
                endItems={getStepCount()}
                css={`
                  width: 100%;
                  padding: 0;
                `}
              />
            </ColStepBar>
          </GridRowStepBar>
        </GridContainer>
      </StepBar>
      {getContent()}
    </Layer>
  )
}

export default Creation
