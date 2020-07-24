import React, { useState, useContext, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Col, Row } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import moment from 'moment'
import 'styled-components/macro'

import AlignmentTerms from 'components/Investment/AlignmentTerms'
import FundDetailCard from 'components/FundDetail/Card'
import Modal from 'components/Modal/Confirmation'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import FundDetailModal from 'components/FundDetail/Modal'
import Text from 'components/Text'
import TransactionHeader from 'components/Header/TransactionsHeader'
import { GetRedeemAlignmentTermsRequest } from 'store/modules/Investment/Redeem/AlignmentTerms/action'
import { Run2FAInitialRequest } from 'store/modules/2FAToken/action'
import { baseURLNamespaceInvestAws, post } from 'services/api'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import { formatLocaleStringToNumber } from 'helpers'

//Steps
import BallanceRedeem from './BallanceRedeem'
import SummaryRedeem from './SummaryRedeem'
import CardSuccessError from './components/CardSuccessError'

import { 
  CustomCol, 
  Container, 
  DigitalSignature,
  LayerStyled,
  TokenCard 
} from './styles'


export type IFormData = {
  moneyToRedeem: string
  alignmentAware: string
}

export const FORM_DATA_INTIAL_STATE = {
  moneyToRedeem: '',
  alignmentAware: 'N'
}

interface IProps {
  handleClose: () => void
  isOpen: boolean
  selectedFundId: string
}
const Redeem: React.FC<IProps> = ({ isOpen, handleClose, selectedFundId }) => {
  const [formData, setFormData] = useState<IFormData>(FORM_DATA_INTIAL_STATE)
  const history = useHistory()
  const dispatch = useDispatch()
  const themeContext = useContext(ThemeContext)
  const { addToast } = useToast()
  const isMobile = useMedia('xs')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFundDetailOpen, setFundDetailOpen] = useState(false)
  const [step, setStep] = useState<number>(1)
  const [isAlignmentTermOpen, setIsAlignmentTermOpen] = useState(false)
  const [acceptAlignmentTerms, setAcceptAlignmentTerms] = useState(false)
  const [isAlignmentTermModalOpen, setIsAlignmentTermOpenModal] = useState(
    false
  )
  const {  cpf, id_cotista, idFund } = useSelector((state: any) => ({
    cpf: state.auth.cpf,
    id_cotista: state.suitabilityInfo.data?.id_cotista,
    idFund: state.investmentPosition.idFund
  }))

  const maxSteps = 4
  const goBackHandler = () =>
    step !== 1 ? setStep(currentStep => currentStep - 1) : history.goBack()

  const handlePostWithdraw = useCallback(async () => {
    setIsLoading(true)

    // "id_fundo": "5105",
    // "id_cotista": "2000143425",
    // "cpf_cnpj": "37282985812",
    // "valor": "1000",
    // "data": "2020-07-09",
    // "tipo_resgate": "2",
    // "ciencia_desenquadramento": "S"

    await post(`${baseURLNamespaceInvestAws}/cotista/resgates`, {
      id_cotista,
      cpf_cnpj: cpf,
      id_fundo: idFund,
      data_operacao: moment().format('YYYY-MM-DD'),
      valor: formData.moneyToRedeem,
      ciencia_desenquadramento: formData.alignmentAware,
      tipo_resgate: '2'
    })
      .then(() => setIsSuccess(true))
      .finally(() => setIsLoading(false))
  }, [id_cotista, idFund, cpf, formData])

  const getStatus = () => {
    if (isSuccess) {
      return 'SUCCESS'
    }
    return 'ERROR'
 }

  const resetValue = () => {
    setStep(1)
    setFormData(FORM_DATA_INTIAL_STATE)
  }

  const nextStep = () => {
    dispatch(
      GetRedeemAlignmentTermsRequest({
        data: {
          data_operacao: moment(new Date(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
          valor_bruto: formatLocaleStringToNumber('10000'),
          id_fundo: selectedFundId,
        },
        onSuccess: (alignmentData: any) => {
          alignmentData.enquadramento_ordem_cotista.status_enquadramento ===
            'Desenquadrado' && setIsAlignmentTermOpenModal(true)

          alignmentData.enquadramento_ordem_cotista.status_enquadramento ===
            'Enquadrado' && setStep(step + 1)
        },
        onErrorToast: addToast,
      })
    )
  }

  const handleChangeFormData = (newFormData: IFormData) => {
    setFormData(prevState => ({ ...prevState, ...newFormData }))
  }

  const previousStep = () => {
    if (step === 0) {
      resetValue()
    } else {
      if (step > 1 && step <= maxSteps) {
        setStep(step - 1)
      }
    }
  }

  const stepsContent = [
    <BallanceRedeem
      formData={formData}
      onChangeFormData={handleChangeFormData}
      step={step}
      nextStep={nextStep}
      previousStep={previousStep}
      onChangeFundDetailOpen={setFundDetailOpen}
      idFundo={selectedFundId}
      resetValue={resetValue}
    />,
    <SummaryRedeem
      step={step}
      nextStep={() => dispatch(Run2FAInitialRequest({ addToast, onSuccess: () => setStep(step + 1) }))}
      previousStep={previousStep}
      onChangeFundDetailOpen={setFundDetailOpen}
      idFundo={selectedFundId}
    />,
    <TokenCard 
      onNext={() => setStep(step + 1)}
      onPrevious={() => setStep(step - 1)}
    />,
    <DigitalSignature 
      onConfirm={handlePostWithdraw}
      onPrevious={() => setStep(step - 1)}
      onError={() => setError(true)}
    />,
    <CardSuccessError
      successOrError={getStatus()}
      textMessage="SUCCESS_FUND_CLOSED"
      days="XX"
      onHandleHomePage={() => {}}
      onHandleManagerPage={() => {}}
    />,
  ]

  const getBodyContent = () => {
    return stepsContent[step - 1] //Step index
  }

  const handleChangeacceptAlignmentTerms = () => {
    setAcceptAlignmentTerms(!acceptAlignmentTerms)
  }

  const handleCloseAlignmentTerm = () => {
    setIsAlignmentTermOpen(false)
    setAcceptAlignmentTerms(false)
    if (step !== 1) {
      setStep(1)
    }
  }

  const handleAlignmentTermCloseModal = () => {
    setIsAlignmentTermOpenModal(false)
  }

  const handleConfirmNextStep = () => {
    setFormData(prevState => ({ ...prevState, alignmentAware: 'S' }))
    setIsAlignmentTermOpen(false)
    if (step >= 1 && step <= maxSteps) {
      setStep(step + 1)
    }
  }

  return (
    <LayerStyled
      isOpen={isOpen}
      handleClose={handleClose}
      headerContent={
        <TransactionHeader
          onBack={goBackHandler}
          onClose={handleClose}
          showBackButton={step !== 1}
          showStepsBar
          stepsBarProps={{
            title: 'Resgatar',
            step,
            maxSteps,
            setStep,
          }}
        />
      }
    >
      {isAlignmentTermOpen ? (
        <AlignmentTerms
          acceptAlignmentTerms={acceptAlignmentTerms}
          onHandleChangeacceptAlignmentTerms={handleChangeacceptAlignmentTerms}
          onHandleCloseAlignmentTerm={handleCloseAlignmentTerm}
          onHandleConfirmNextStep={handleConfirmNextStep}
        />
      ) : (
        <Container>
          <Row>
            {!isMobile && (
              <CustomCol md={4} lg={3}>
                <FundDetailCard
                  handleFundDetailOpen={() => setFundDetailOpen(true)}
                />
              </CustomCol>
            )}
            <CustomCol md={8} lg={9}>
              {getBodyContent()}
            </CustomCol>
          </Row>
          <Row
            css={`
              margin: ${themeContext.spacing(2)}px 0;
            `}
          >
            <Col md={12}>
              <Text type="body" bold color="gray5">
                Toda transmissão de ordem por meio digital está sujeita a
                interrupções ou atrasos, podendo impedir ou prejudicar o envio
                de ordens ou a recepção de informações atualizadas.
              </Text>
            </Col>
          </Row>
        </Container>
      )}
      {isMobile ? (
        <FundDetailModal
          isOpen={isFundDetailOpen}
          handleClose={() => setFundDetailOpen(false)}
          isLayerOpen
          title="Detalhes do fundo"
        />
      ) : (
        <FundDetailDrawer
          isOpen={isFundDetailOpen}
          isLayerOpen
          handleClose={() => setFundDetailOpen(false)}
        />
      )}
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
    </LayerStyled>
  )
}

export default Redeem
