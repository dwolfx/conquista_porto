import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import useMedia from 'hooks/useMedia'
import TransactionHeader from 'components/Header/TransactionsHeader'
import Text from 'components/Text'

import RedeemCard from './RedeemCard'
import {
  Col,
  Container,
  FullHeightCard,
} from './styles'


const Redeem = () => {

  const history = useHistory()
  const isMobile = useMedia('xs')

  const maxSteps = 4
  const [step, setStep] = useState<number>(1)
  return (
    <>
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
        title: 'Resgatar',
        step,
        maxSteps,
        setStep,
      }}
    />
    <Container>
      <Row>
        {!isMobile && (
          <Col md={3}>
            <FullHeightCard>
              <Text type="headline" color="magenta1" bold>
                Banco
              </Text>
            </FullHeightCard>
          </Col>
        )}
        <Col md={9}>
          <RedeemCard step={step} setStep={setStep} />
        </Col>
      </Row>
    </Container>
  </>
  )
}

export default Redeem