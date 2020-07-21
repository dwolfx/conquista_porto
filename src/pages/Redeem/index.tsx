import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Col, Row } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Modal from 'components/Modal/Confirmation'
import FundDetailCard from 'components/FundDetail/Card'
import FundDetailModal from 'components/FundDetail/Modal'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import TransactionHeader from 'components/Header/TransactionsHeader'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'

import { formatLocaleStringToNumber } from 'helpers'

//Steps
import BallanceRedeem from './BallanceRedeem'
import ResumeRedeem from './ResumeRedeem'

import AlignmentTerms from 'components/Investment/AlignmentTerms'
import moment from 'moment'
import { GetRedeemAlignmentTermsRequest } from 'store/modules/Investment/Redeem/AlignmentTerms/action'
import { useToast } from 'hooks/toast'

import { CustomCol, Container } from './styles'

const Redeem = () => {
  const [isFundDetailOpen, setFundDetailOpen] = useState(false)
  const [step, setStep] = useState<number>(1)
  const [isAlignmentTermOpen, setIsAlignmentTermOpen] = useState(false)
  const [acceptAlignmentTerms, setAcceptAlignmentTerms] = useState(false)
  const [isAlignmentTermModalOpen, setIsAlignmentTermOpenModal] = useState(
    false
  )
  // const [isLoadingNextButton, setIsLoadingNextButton] = useState<boolean>(false)
  const history = useHistory()
  const isMobile = useMedia('xs')
  const themeContext = useContext(ThemeContext)
  const { idFund } = useSelector((state: any) => ({
    idFund: state.investmentPosition.idFund,
  }))
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const maxSteps = 4

  const goBackHandler = () =>
    step !== 1 ? setStep(currentStep => currentStep - 1) : history.goBack()

  const nextStep = () => {
    // setIsLoadingNextButton(alignmentTermsIsLoading)
    dispatch(
      GetRedeemAlignmentTermsRequest({
        data: {
          data_operacao: moment(new Date(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
          valor_bruto: formatLocaleStringToNumber('1000.9'),
          id_fundo: idFund,
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

  const previousStep = () => {
    if (step === 0) {
      // resetValues()
    } else {
      setStep(step - 1)
    }
  }

  const stepsContent = [
    <BallanceRedeem
      step={step}
      nextStep={nextStep}
      previousStep={previousStep}
      onChangeFundDetailOpen={setFundDetailOpen}
      idFundo={idFund}
    />,
    <ResumeRedeem
      step={step}
      setStep={setStep}
      onChangeFundDetailOpen={setFundDetailOpen}
      idFundo={idFund}
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
    if (step !== 0) {
      setStep(0)
    }
  }

  const handleAlignmentTermCloseModal = () => {
    setIsAlignmentTermOpenModal(false)
  }

  const handleConfirmNextStep = () => {
    setIsAlignmentTermOpen(false)
    setStep(step + 1)
  }

  return (
    <>
      <TransactionHeader
        onBack={goBackHandler}
        onClose={() => history.push('/')}
        showBackButton={step !== 1}
        showStepsBar
        stepsBarProps={{
          title: 'Resgatar',
          step,
          maxSteps,
          setStep,
        }}
      />
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
          title="Andre"
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
    </>
  )
}

export default Redeem
