import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'
import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Modal from 'components/Modal/Confirmation'
import Anbima from 'components/Anbima'

import { GetAlignmentTermsDataRequest } from 'store/modules/Investment/FinancialApplication/AlignmentTerms/action'

import AlignmentTerms from './AlignmentTerms'
import LayerHeader from './LayerHeader'
import FormFinancialContribution from './FormFinancialContribution'
import SummaryFinancialContribution from './SummaryFinancialContribution'

import SuccessCard from './EndOfApplicationFlow/SuccessCard'
import ErrorCard from './EndOfApplicationFlow/ErrorCard'

import { formatMoneyDecimal, formatLocaleStringToNumber } from 'helpers'
import DetailCard from './DetailCard'

import {
  BodyWrapper,
  StepBar,
  ColStepBar,
  GridContainer,
  LayerBodyContainer,
  FooterContainer,
  GridRow,
  GridRowExpanded,
  GridCol,
  GridRowStepBar,
  LayerFinancialApplication,
  GridColInfo,
  MobileScrollContent,
} from './styles'

interface IProps {
  handleClose: () => void
  isOpen: boolean
  selectedFundId: string
  isAwareOfTerms: boolean
}

export type IFormData = {
  moneyToInvest: string
  whenToInvest: string
  isAwareOfTerms: boolean
}

const LayerInvestment: React.FC<IProps> = ({
  handleClose = () => {},
  handleFundDetailOpen = () => {},
  isOpen = false,
  selectedFundId,
  isAwareOfTerms,
}) => {
  const FORM_DATA_INTIAL_STATE = {
    moneyToInvest: '',
    whenToInvest: '',
    isAwareOfTerms,
  }
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const [step, setStep] = useState(0)
  const [isLoadingNextButton, setIsLoadingNextButton] = useState<boolean>(false)
  const [hasFormChanged, setHasFormChanged] = useState(false)
  const [hasSucceded, setHasSucceded] = useState<boolean>(false)
  const [hasFailed, setHasFailed] = useState<boolean>(false)
  const [errorCount, setErrorCount] = useState<number>(0)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [isAlignmentTermModalOpen, setIsAlignmentTermOpenModal] = useState(
    false
  )
  const [isAlignmentTermOpen, setIsAlignmentTermOpen] = useState(false)
  const [formData, setFormData] = useState<IFormData>(FORM_DATA_INTIAL_STATE)
  const [formDataCopy, setFormDataCopy] = useState<IFormData>(
    FORM_DATA_INTIAL_STATE
  )
  const [acceptAlignmentTerms, setAcceptAlignmentTerms] = useState(false)
  const [operationDate, setOperationDate] = useState<string>('')

  const {
    funds,
    financialApplicationData,
    alignmentTermsIsLoading,
  } = useSelector((state: any) => ({
    funds: state.investmentsList,
    financialApplicationData: state.financialApplicationGetData.data,
    alignmentTermsIsLoading: state.alignmentTerms.isLoading,
  }))

  const stepCount = 2
  const isMobile = useMedia('xs')

  // the operation date is only setted on component mount, the value will be updated on the store eventually (if needed) so we use this to compare
  useEffect(() => {
    if (operationDate.length === 0) {
      setOperationDate(
        moment(
          financialApplicationData.dados_para_aplicacao.data_operacao
        ).format('DD/MM/YYYY')
      )
    }
  }, [financialApplicationData, operationDate])

  const loadFormData = useCallback(
    (prevState: any): any => {
      const selectedFund = funds.data.find(
        (fund: any) => fund.id_fundo === selectedFundId
      )

      return {
        ...prevState,
        moneyToInvest: formatMoneyDecimal(
          Number(selectedFund.minimo_inicial * 100)
        ),
        whenToInvest: operationDate,
        isAwareOfTerms,
      }
    },
    [funds.data, selectedFundId, isAwareOfTerms, operationDate]
  )

  useEffect(() => {
    if (selectedFundId && funds.data.length > 0) {
      setFormData(prevState => loadFormData(prevState))
      setFormDataCopy(prevState => loadFormData(prevState))
    }
  }, [selectedFundId, funds.data, loadFormData])

  useEffect(() => {
    if (!selectedFundId) {
      setHasFormChanged(false)
      setFormData(FORM_DATA_INTIAL_STATE)
      setFormDataCopy(FORM_DATA_INTIAL_STATE)
      setStep(0)
    }
  }, [selectedFundId, FORM_DATA_INTIAL_STATE])

  useEffect(() => {
    if (errorCount === 5) {
      setHasFailed(true)
    }
  }, [errorCount])

  useEffect(() => {
    if (hasFailed || hasSucceded) {
      setHasFormChanged(false)
      setStep(0)
    }
  }, [hasSucceded, hasFailed])

  const resetValues = () => {
    setHasFailed(false)
    setHasSucceded(false)
    setFormData(FORM_DATA_INTIAL_STATE)
    setFormDataCopy(FORM_DATA_INTIAL_STATE)
    setStep(0)
    setErrorCount(0)
    setIsAlignmentTermOpen(false)
    setIsAlignmentTermOpenModal(false)
    handleClose()
  }

  const checkCloseOrBack = (step: number, actionType: string) => {
    switch (step) {
      case 0:
        if (hasFormChanged) {
          setIsConfirmationModalOpen(true)
          setIsAlignmentTermOpen(false)
          setIsAlignmentTermOpenModal(false)
        } else {
          resetValues()
        }
        break
      case 1:
        if (actionType === 'CLOSE') {
          setIsConfirmationModalOpen(true)
        }
        if (actionType === 'BACK') {
          setStep(step - 1)
        }
        setIsAlignmentTermOpen(false)
        setIsAlignmentTermOpenModal(false)
        break
      default:
        resetValues()
        break
    }
  }

  const handleBackOrClose = (actionType: 'BACK' | 'CLOSE') => {
    if (hasFailed || hasSucceded) {
      resetValues()
    } else {
      checkCloseOrBack(step, actionType)
    }
  }

  const headerAttributes = {
    step,
    setStep,
    handleClose: handleBackOrClose,
  }

  const handleChangeacceptAlignmentTerms = () => {
    setAcceptAlignmentTerms(!acceptAlignmentTerms)
  }

  const nextStep = () => {
    setIsLoadingNextButton(alignmentTermsIsLoading)
    dispatch(
      GetAlignmentTermsDataRequest({
        data: {
          data_operacao: moment(formData.whenToInvest, 'DD/MM/YYYY').format(
            'YYYY-MM-DD'
          ),
          valor_bruto: formatLocaleStringToNumber(formData.moneyToInvest),
          id_fundo: selectedFundId,
        },
        onSuccess: alignmentData => {
          alignmentData.enquadramento_ordem_cotista.status_enquadramento ===
            'Desenquadrado' && setIsAlignmentTermOpenModal(true)

          alignmentData.enquadramento_ordem_cotista.status_enquadramento ===
            'Enquadrado' && setStep(step + 1)
        },
        onErrorToast: addToast,
      })
    )
  }

  const previousStep = () => {
    if (step === 0) {
      resetValues()
    } else {
      setStep(step - 1)
    }
  }

  const handleConfirmNextStep = () => {
    setIsAlignmentTermOpen(false)
    if (step === 0) {
      setStep(step + 1)
    }
  }

  const handleCloseAlignmentTerm = () => {
    setIsAlignmentTermOpen(false)
    setAcceptAlignmentTerms(false)
    if (step !== 0) {
      setStep(0)
    }
  }

  const handleAlignmentTermCloseModal = () => {
    setIsAlignmentTermOpenModal(false)
  }

  const incrementError = () => {
    setErrorCount(prevState => prevState + 1)
  }

  const handleRequestStatus = (id: 'success' | 'error', value: boolean) => {
    id === 'success' ? setHasSucceded(value) : setHasFailed(value)
  }

  const handleChangeFormData = (newFormData: IFormData) => {
    setFormData(prevState => ({ ...prevState, ...newFormData }))
  }

  const layerBody = [
    <FormFinancialContribution
      financialApplication={financialApplicationData}
      hasCheckbox={!isAwareOfTerms}
      formData={formData}
      formDataCopy={formDataCopy}
      nextStep={nextStep}
      onChangeFormData={handleChangeFormData}
      onFormHasChanged={setHasFormChanged}
      idFundo={selectedFundId}
      nextButtonLoading={isLoadingNextButton}
      operationDate={operationDate}
    />,
    <SummaryFinancialContribution
      idFundo={selectedFundId}
      acceptAlignmentTerms={acceptAlignmentTerms}
      formData={formData}
      previousStep={previousStep}
      onChangeRequestStatus={handleRequestStatus}
      errorCount={errorCount}
      onChangeErrorCount={incrementError}
    />,
  ]

  const getBodyContent = () => {
    if (hasSucceded) {
      return (
        <GridCol sm={12} md={8} lg={9}>
          <SuccessCard
            onCloseLayer={() => resetValues()}
            handleCloseButton={handleClose}
          />
        </GridCol>
      )
    }
    if (hasFailed) {
      return (
        <GridCol sm={12} md={8} lg={9}>
          <ErrorCard
            onCloseLayer={() => resetValues()}
            handleCloseButton={handleClose}
          />
        </GridCol>
      )
    }
    return (
      <GridCol sm={12} md={8} lg={9}>
        {layerBody[step]}
      </GridCol>
    )
  }

  const getStepCount = () => {
    if (!hasSucceded && !hasFailed) {
      return [
        <Text color="gray4" type="title">
          {`ETAPA ${step + 1} de ${stepCount}`}
        </Text>,
      ]
    }
    return []
  }

  const getBodySteps = () => {
    return (
      <BodyWrapper>
        <StepBar>
          <GridContainer>
            <GridRowStepBar>
              <ColStepBar lg={12}>
                <HorizontalList
                  size="small"
                  startItems={[
                    <Text color="gray4" type="headline">
                      Investir
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
        <MobileScrollContent
          expandBottomHeight={hasSucceded || hasFailed}
          isAlignmentTermOpen={isAlignmentTermOpen}
        >
          <LayerBodyContainer>
            <GridRowExpanded>
              <GridCol sm={12} md={4} lg={3}>
                <DetailCard handleFundDetailOpen={handleFundDetailOpen} />
              </GridCol>
              {getBodyContent()}
            </GridRowExpanded>
          </LayerBodyContainer>
          <FooterContainer>
            <GridRow>
              <GridColInfo col={12}>
                <Text color="gray5" type="body">
                  Toda transmissão de ordem por meio digital está sujeita a
                  interrupções ou atrasos, podendo impedir ou prejudicar o envio
                  de ordens ou a recepção de informações atualizadas.
                </Text>
              </GridColInfo>
            </GridRow>
            <GridRow>
              <Anbima noMarginTop />
            </GridRow>
          </FooterContainer>
        </MobileScrollContent>
      </BodyWrapper>
    )
  }

  useEffect(() => {
    const html = document.querySelector<HTMLInputElement>('html')
    if (isAlignmentTermOpen) {
      html!.style.overflowY = 'hidden'
    }
  }, [isAlignmentTermOpen])

  return financialApplicationData?.dados_para_aplicacao ? (
    <LayerFinancialApplication
      handleClose={handleClose}
      isOpen={isOpen}
      headerContent={<LayerHeader {...headerAttributes} />}
    >
      {isAlignmentTermOpen ? (
        <AlignmentTerms
          acceptAlignmentTerms={acceptAlignmentTerms}
          onHandleChangeacceptAlignmentTerms={handleChangeacceptAlignmentTerms}
          onHandleCloseAlignmentTerm={handleCloseAlignmentTerm}
          onHandleConfirmNextStep={handleConfirmNextStep}
        />
      ) : (
        getBodySteps()
      )}
      <Modal
        isOpen={isConfirmationModalOpen}
        title="Sair da página?"
        description="Todas as informações serão perdidas e a solicitação não será finalizada."
        buttonTextCancel={`continuar ${isMobile ? '' : 'solicitação'}`}
        buttonTextConfirm="sair"
        onClose={() => {
          setIsConfirmationModalOpen(false)
        }}
        onConfirmation={() => {
          setIsConfirmationModalOpen(false)
          handleClose()
        }}
      />
      <Modal
        isOpen={isAlignmentTermModalOpen}
        title="Risco acima do seu perfil"
        description="Sua carteira passará a ter uma risco maior do que o permitido para o seu perfil. Para continuar, você deve assinar o termo de desenquadramento."
        buttonTextCancel="ver termo"
        buttonTextConfirm="cancelar"
        onClose={() => {
          handleAlignmentTermCloseModal()
          setIsAlignmentTermOpen(true)
          setAcceptAlignmentTerms(false)
        }}
        onConfirmation={handleAlignmentTermCloseModal}
        onCloseHeaderButton={handleAlignmentTermCloseModal}
      />
    </LayerFinancialApplication>
  ) : null
}

interface IProps {
  handleClose: () => void
  handleFundDetailOpen?: () => void
  isOpen: boolean
}

export default LayerInvestment
