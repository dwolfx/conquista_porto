import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import 'styled-components/macro'
import useMedia from 'hooks/useMedia'

import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Modal from 'components/Modal/Confirmation'

import LayerHeader from './LayerHeader'
import FormFinancialContribution from './FormFinancialContribution'
import SummaryFinantialContribution from './SummaryFinantialContribution'

import SuccessCard from './EndOfApplicationFlow/SuccessCard'
import ErrorCard from './EndOfApplicationFlow/ErrorCard'

import { formatMoneyDecimal } from 'helpers'
import DetailCard from './DetailCard'

import {
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
}

export type IFormData = {
  moneyToInvest: string
  whenToInvest: string
  isAwareOfTerms: boolean
}

const FORM_DATA_INTIAL_STATE = {
  moneyToInvest: '',
  whenToInvest: '',
  isAwareOfTerms: false,
}

const LayerInvestment: React.FC<IProps> = ({
  handleClose = () => {},
  handleFundDetailOpen = () => {},
  isOpen = false,
  selectedFundId,
}) => {
  const [step, setStep] = useState(0)
  const [hasFormChanged, setHasFormChanged] = useState(false)
  const [hasSucceded, setHasSucceded] = useState<boolean>(false)
  const [hasFailed, setHasFailed] = useState<boolean>(false)
  const [errorCount, setErrorCount] = useState<number>(0)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [formData, setFormData] = useState<IFormData>(FORM_DATA_INTIAL_STATE)
  const [formDataCopy, setFormDataCopy] = useState<IFormData>(
    FORM_DATA_INTIAL_STATE
  )

  const funds = useSelector((state: any) => state.investmentsList)
  const stepCount = 2
  const isMobile = useMedia('xs')

  const loadFormData = useCallback(
    (prevState: any): any => {
      const selectedFund = funds.data.find(
        (fund: any) => fund.id_fundo === selectedFundId
      )
      const canInvestToday = moment(moment(), 'hh:mm:ss').isBefore(
        moment('15:00:00', 'hh:mm:ss')
      )
      return {
        ...prevState,
        moneyToInvest: formatMoneyDecimal(
          Number(selectedFund.minimo_inicial * 100)
        ),
        whenToInvest: canInvestToday
          ? moment().format('DD/MM/YYYY')
          : moment()
              .add('1', 'day')
              .format('DD/MM/YYYY'),
        isAwareOfTerms: false,
      }
    },
    [funds.data, selectedFundId]
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
  }, [selectedFundId])

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
    handleClose()
  }

  const checkCloseOrBack = (step: number, actionType: string) => {
    switch (step) {
      case 0:
        if (hasFormChanged) {
          setIsConfirmationModalOpen(true)
        } else {
          resetValues()
        }
        break
      case 1:
        if (actionType === 'BACK') {
          setStep(step - 1)
        } else {
          setIsConfirmationModalOpen(true)
        }
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

  const nextStep = () => {
    setStep(step + 1)
  }

  const previousStep = () => {
    if (step === 0) {
      resetValues()
    } else {
      setStep(step - 1)
    }
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
      formData={formData}
      formDataCopy={formDataCopy}
      nextStep={nextStep}
      onChangeFormData={handleChangeFormData}
      onFormHasChanged={setHasFormChanged}
      idFundo={selectedFundId}
    />,
    <SummaryFinantialContribution
      formData={formData}
      onChangeFormData={handleChangeFormData}
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
          <SuccessCard onCloseLayer={() => resetValues()} />
        </GridCol>
      )
    }
    if (hasFailed) {
      return (
        <GridCol sm={12} md={8} lg={9}>
          <ErrorCard onCloseLayer={() => resetValues()} />
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

  return (
    <LayerFinancialApplication
      handleClose={handleClose}
      isOpen={isOpen}
      headerContent={<LayerHeader {...headerAttributes} />}
    >
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
      <MobileScrollContent expandBottomHeight={hasSucceded || hasFailed}>
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
        </FooterContainer>
      </MobileScrollContent>
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
    </LayerFinancialApplication>
  )
}

interface IProps {
  handleClose: () => void
  handleFundDetailOpen?: () => void
  isOpen: boolean
}

export default LayerInvestment
