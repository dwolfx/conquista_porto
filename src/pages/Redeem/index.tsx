import React, { useState, useContext, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Col, Row } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import moment from 'moment'
import 'styled-components/macro'
import Anbima from 'components/Anbima'
import AlignmentTerms from 'components/Investment/AlignmentTerms'
import FundDetailCard from 'components/FundDetail/Card'
import Modal from 'components/Modal/Confirmation'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import FundDetailModal from 'components/FundDetail/Modal'
import Text from 'components/Text'
import TransactionHeader from 'components/Header/TransactionsHeader'
import TokenCard from 'components/2FA/TokenCard'
import DigitalSignature from 'components/2FA/DigitalSignature'
import { GetRedeemAlignmentTermsRequest } from 'store/modules/Investment/Redeem/AlignmentTerms/action'
import { ClearReddemSummary } from 'store/modules/Investment/Redeem/SummaryRedeem/action'
import { Run2FAInitialRequest } from 'store/modules/2FAToken/action'
import { formatMoneyToNumber } from 'pages/Investments/FinancialApplication/FormFinancialContribution/utils'
import { baseURLNamespaceInvestAws, post } from 'services/api'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

//Steps
import BallanceRedeem from './BallanceRedeem'
import SummaryRedeem from './SummaryRedeem'
import CardSuccessError from './components/CardSuccessError'

import { CustomCol, Container, LayerStyled } from './styles'
export type IFormData = {
  moneyToRedeem: string
  alignmentAware: string
}

export const FORM_DATA_INTIAL_STATE = {
  moneyToRedeem: '',
  alignmentAware: 'N',
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
  const [, setIsLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFundDetailOpen, setFundDetailOpen] = useState(false)
  const [step, setStep] = useState<number>(1)
  const [isAlignmentTermOpen, setIsAlignmentTermOpen] = useState(false)
  const [acceptAlignmentTerms, setAcceptAlignmentTerms] = useState(false)
  const [isAlignmentTermModalOpen, setIsAlignmentTermOpenModal] = useState(
    false
  )
  const { cpf, id_cotista, idFund } = useSelector((state: any) => ({
    cpf: state.auth.cpf,
    id_cotista: state.suitabilityInfo.data?.id_cotista,
    idFund: state.investmentPosition.idFund,
  }))

  const maxSteps = 5
  const goBackHandler = () =>
    step !== 1 ? setStep(currentStep => currentStep - 1) : history.goBack()

  const handlePostRedeem = useCallback(async () => {
    setIsLoading(true)
    await post(`${baseURLNamespaceInvestAws}/cotista/resgates`, {
      id_cotista,
      cpf_cnpj: cpf,
      id_fundo: idFund,
      data_operacao: moment().format('YYYY-MM-DD'),
      valor: formatMoneyToNumber(formData.moneyToRedeem).toString(),
      ciencia_desenquadramento: formData.alignmentAware,
      tipo_resgate: '2',
    })
      .then(() => setIsSuccess(true))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false))
  }, [id_cotista, idFund, cpf, formData])

  const getStatus = () => {
    if (isSuccess) {
      return 'SUCCESS'
    }
    return 'ERROR'
  }

  const resetValues = () => {
    setStep(1)
    setFormData(FORM_DATA_INTIAL_STATE)
    dispatch(ClearReddemSummary())
  }

  const nextStep = () => {
    dispatch(
      GetRedeemAlignmentTermsRequest({
        data: {
          data_operacao: moment(new Date(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
          valor_bruto: formData?.moneyToRedeem,
          id_fundo: selectedFundId,
        },
        onSuccess: (alignmentData: any) => {
          alignmentData.status_enquadramento === 'Desenquadrado' &&
            setIsAlignmentTermOpenModal(true)

          alignmentData.status_enquadramento === 'Enquadrado' &&
            setStep(step + 1)
        },
        onErrorToast: addToast,
      })
    )
  }

  const handleChangeFormData = (newFormData: IFormData) => {
    setFormData(prevState => ({ ...prevState, ...newFormData }))
  }

  const previousStep = () => {
    if (step > 1 && step <= maxSteps) {
      setStep(step - 1)
    }
  }

  const handleHomePage = () => {
    history.push('/')
    resetValues()
    handleClose()
  }

  const handleInvestiments = () => {
    history.push('/investimentos')
    resetValues()
    handleClose()
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
      resetValue={resetValues}
    />,
    <SummaryRedeem
      step={step}
      nextStep={() =>
        dispatch(
          Run2FAInitialRequest({ addToast, onSuccess: () => setStep(step + 1) })
        )
      }
      previousStep={previousStep}
      onChangeFundDetailOpen={setFundDetailOpen}
      idFundo={selectedFundId}
    />,
    <TokenCard
      onNext={() => setStep(step + 1)}
      onPrevious={() => setStep(step - 1)}
    />,
    <DigitalSignature
      onConfirm={handlePostRedeem}
      onPrevious={() => setStep(step - 1)}
      onError={() => setError(true)}
    />,
    <CardSuccessError
      successOrError={getStatus()}
      textMessage={'DEFAULT'}
      days=""
      onHandleHomePage={handleHomePage}
      onHandleManagerPage={handleInvestiments}
    />,
  ]

  if ((isSuccess || hasError) && step === 4) {
    setStep(5)
  }

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
      handleClose={() => {
        resetValues()
        handleClose()
      }}
      headerContent={
        <TransactionHeader
          onBack={goBackHandler}
          onClose={() => {
            resetValues()
            handleClose()
          }}
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
              margin: ${themeContext.spacing(2)}px ${themeContext.spacing(1)}px;
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
          <Row>
            <Anbima noMarginTop />
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
