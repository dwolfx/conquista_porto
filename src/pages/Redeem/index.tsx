import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Row } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import FundDetailCard from 'components/FundDetail/Card'
import FundDetailModal from 'components/FundDetail/Modal'
import FundDetailDrawer from 'components/FundDetail/Drawer'
import TransactionHeader from 'components/Header/TransactionsHeader'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'

//Steps
import BallanceRedeem from './BallanceRedeem'

import {
  CustomCol,
  Container,
} from './styles'

const Redeem = () => {
  const [isFundDetailOpen, setFundDetailOpen] = useState(false)
  const [step, setStep] = useState<number>(1)
  const history = useHistory()
  const isMobile = useMedia('xs')
  const themeContext = useContext(ThemeContext)

  const maxSteps = 4

  const goBackHandler = () => step !== 1
    ? setStep(currentStep => currentStep - 1)
    : history.goBack()

  const stepsContent = [
    <BallanceRedeem 
      step={step}
      setStep={setStep}
      onChangeFundDetailOpen={setFundDetailOpen}
    />
  ]

  const getBodyContent = () => {
    return stepsContent[step]
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
    <Container>
      <Row>
        {!isMobile && (
          <CustomCol md={4} lg={3}>
            <FundDetailCard handleFundDetailOpen={() => setFundDetailOpen(true)}/>
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
          <Text type="body" bold color="gray5">Toda transmissão de ordem por meio digital está sujeita a interrupções ou atrasos, podendo impedir ou prejudicar o envio de ordens ou a recepção de informações atualizadas.</Text>
        </Col>
      </Row>
    </Container>
    { isMobile ? (
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
    ) }
  </>
  )
}

export default Redeem