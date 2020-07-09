import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import useMedia from 'hooks/useMedia'
import TransactionHeader from 'components/Header/TransactionsHeader'
import Text from 'components/Text'

import ExitModal from './ExitModal'
import WithdrawCard from './WithdrawCard'
import * as s from './styles'

const Withdraw = () => {
  const history = useHistory()
  const isMobile = useMedia('xs')

  const maxSteps = 4
  const [step, setStep] = useState<number>(1)

  return (
    <>
      <ExitModal
        hasUnsavedChanges={true}
        onConfirmation={() => history.push('')}
      />
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
          {!isMobile && (
            <Col md={3}>
              <s.FullHeightCard>
                <Text type="headline" color="magenta1" bold>
                  Banco
                </Text>
              </s.FullHeightCard>
            </Col>
          )}
          <s.Col md={9}>
            <WithdrawCard step={step} setStep={setStep} />
          </s.Col>
        </Row>
      </s.Container>
    </>
  )
}

export default Withdraw
