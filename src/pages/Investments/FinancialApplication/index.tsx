import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import Layer from 'components/Layer'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Modal from 'components/Modal/Confirmation'

import LayerHeader from './LayerHeader'
import FormFinancialContribution from './FormFinancialContribution'

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

const LayerInvestment: React.FC<IProps> = ({
  handleClose = () => {},
  handleDrawerOpen = () => {},
  isOpen = false,
  selectedFundId,
}) => {
  const funds = useSelector((state: any) => state.investmentsList)

  const [step, setStep] = useState(0)
  const [hasFormChanged, setHasFormChanged] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [formData, setFormData] = useState<IFormData | null>(null)
  const stepCount = 2

  useEffect(() => {
    if (selectedFundId && funds.data.length > 0) {
      const normalizedFundList = funds.data
        .flatMap((item: any) => item)
        .reduce((prev: any, curr: any) => [...prev, ...curr.fundos], [])

      const selectedFund = normalizedFundList.find(
        (fund: any) => fund.id_fundo === selectedFundId
      )

      const canInvestToday = moment(moment(), 'hh:mm:ss').isBefore(
        moment('15:00:00', 'hh:mm:ss')
      )

      setFormData(prevState => ({
        ...prevState,
        moneyToInvest: formatMoneyDecimal(
          Number(selectedFund.minimo_inicial.replace(/[\D]/g, ''))
        ),
        whenToInvest: canInvestToday
          ? moment().format('DD/MM/YYYY')
          : moment()
              .add('1', 'day')
              .format('DD/MM/YYYY'),
        isAwareOfTerms: false,
      }))
    }
  }, [selectedFundId, funds.data])

  useEffect(() => {
    if (!selectedFundId) {
      setHasFormChanged(false)
      setFormData(null)
    }
  }, [selectedFundId])

  const checkIfPossibleToClose = () => {
    if (hasFormChanged) {
      setIsConfirmationModalOpen(true)
    } else {
      handleClose()
    }
  }

  const headerAttributes = {
    step,
    setStep,
    handleClose: checkIfPossibleToClose,
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const previousStep = () => {
    if (step === 0) {
      handleClose()
    } else {
      setStep(step - 1)
    }
  }

  const handleChangeFormData = (newFormData: IFormData) => {
    setFormData(prevState => ({ ...prevState, ...newFormData }))
  }

  // ## AQUI ENTRAM OS COMPONENTES DE STEP
  const layerBody = [
    <FormFinancialContribution
      formData={formData}
      nextStep={nextStep}
      onChangeFormData={handleChangeFormData}
      onFormHasChanged={setHasFormChanged}
      idFundo={selectedFundId}
    />,
  ]

  return (
    <Layer
      handleClose={handleClose}
      isOpen={isOpen}
      headerContent={<LayerHeader {...headerAttributes} />}
    >
      <StepBar>
        <GridContainer>
          <GridRow>
            <ColStepBar lg={12}>
              <HorizontalList
                size="small"
                startItems={[
                  <Text color="gray4" type="headline">
                    Investir
                  </Text>,
                ]}
                endItems={[
                  <Text color="gray4" type="title">
                    {`ETAPA ${step + 1} de ${stepCount}`}
                  </Text>,
                ]}
                css={`
                  width: 100%;
                  padding: 0;
                `}
              />
            </ColStepBar>
          </GridRow>
        </GridContainer>
      </StepBar>
      <LayerBodyContainer>
        <GridRowExpanded>
          <GridCol lg={3}>
            <DetailCard handleDrawerOpen={handleDrawerOpen} />
          </GridCol>
          <GridCol lg={9}>{layerBody[step]}</GridCol>
        </GridRowExpanded>
      </LayerBodyContainer>
      <FooterContainer>
        <GridRow>
          <GridCol lg={12}>
            <Text color="gray5" type="body">
              Toda transmissão de ordem por meio digital está sujeita a
              interrupções ou atrasos, podendo impedir ou prejudicar o envio de
              ordens ou a recepção de informações atualizadas.
            </Text>
          </GridCol>
        </GridRow>
      </FooterContainer>
      <Modal
        isOpen={isConfirmationModalOpen}
        title="Sair da página?"
        description="Todas as informações serão perdidas e a solicitação não será finalizada."
        buttonTextCancel="continuar solicitação"
        buttonTextConfirm="sair"
        onClose={() => {
          setIsConfirmationModalOpen(false)
        }}
        onConfirmation={() => {
          setIsConfirmationModalOpen(false)
          handleClose()
        }}
      />
    </Layer>
  )
}

interface IProps {
  handleClose: () => void
  handleDrawerOpen?: () => void
  isOpen: boolean
}

export default LayerInvestment
