import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import TransactionHeader from 'components/Header/TransactionsHeader'
import Text from 'components/Text'

import * as s from './styles'
import WithdrawCard from './WithdrawCard'

const Withdraw = () => {
  const history = useHistory()

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
          title: 'Retirar',
          step,
          maxSteps,
          setStep,
        }}
      />
      <s.Container>
        <Row>
          <Col md={3}>
            <s.FullHeightCard>
              <Text type="headline" color="magenta1" bold>
                Banco
              </Text>
            </s.FullHeightCard>
          </Col>
          <Col md={9}>
            <WithdrawCard />
          </Col>
        </Row>
      </s.Container>
    </>
  )
}

export default Withdraw
