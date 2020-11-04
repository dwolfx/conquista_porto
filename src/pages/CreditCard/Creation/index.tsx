import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import 'styled-components/macro'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import Layer from 'components/Layer'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'
import { truncateString } from 'helpers'

import { baseURLNamespaceInvestAws, post } from 'services/api'
import {
  GetCreditCardExpirationDaysRequest,
  GetCreditCardExpirationDaysClearData,
} from 'store/modules/CreditCard/ExpirationDays/action'

import FirstStep from './FirstStep'
import ThirdStep from './ThirdStep'
import ForthStep from './ForthStep'
import FifthStep from './FifthStep'
import FinalStep from './FinalStep'

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
  const [step, setStep] = useState<steps>(1)
  const [formData, setFormData] = useState<ICreditCardCreationPayload>({})
  const [formResponse, setFormResponse] = useState<IOrderResponse>({})

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

  const goNext = useCallback((stepAnswers: ICreditCardCreationPayload) => {
    if (step < 5) {
      setStep(prevState => (prevState + 1) as steps)
    }

    setFormData(currentFormState => ({
      ...currentFormState,
      ...stepAnswers,
    }))
  }, [step])

  const getStepCount = () => {
    return [
      <Text color="gray4" type="title">
        {`ETAPA ${step} de 5`}
      </Text>,
    ]
  }

  const handlePostSubmit = useCallback(async () => {
    const { data } = await post(
      `${baseURLNamespaceInvestAws}/cartoes/solicitacao`,
      formData
    )

    if (data) {
      setFormResponse(data);
      goNext({});
    }
  }, [formData, goNext])

  // Each step goes here
  const content = [
    <FirstStep onNextStep={goNext} />,
    <ThirdStep formData={formData} onNextStep={goNext} />,
    <ForthStep formData={formData} onNextStep={goNext} />,
    <FifthStep
      formData={formData}
      setFormData={setFormData}
      onSubmit={handlePostSubmit}
    />,
    <FinalStep formData={formData} formOrderResponse={formResponse}/>
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
