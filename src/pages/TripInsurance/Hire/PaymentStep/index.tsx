import React from 'react'

import { Container, Row, Col } from 'styled-bootstrap-grid'
import Button from 'components/Button'
import StepBar from 'pages/TripInsurance/commons/StepBar'

import PaymentMethod from './PaymentMethod'

import * as S from './styles'
import CreditCard from './CreditCard'
import { ICreditCardForm } from './types'

const PaymentStep = () => {
  const portoCreditCardState = React.useState(true)
  const creditCardFormState = React.useState<ICreditCardForm>({ parcelOption: { id: 0, name: '' }, cardNumber: '', name: '', validity: '', cvc: '' })
  const [portoCreditCardIsSelected,] = portoCreditCardState
  const [creditCardForm,] = creditCardFormState
  const allIsValid = creditCardForm.parcelOption.id !== 0
                      && !!creditCardForm.cardNumber
                      && !!creditCardForm.name
                      && !!creditCardForm.validity
                      && !!creditCardForm.cvc

  return (
    <>
      <StepBar actualStep={3} totalNumberOfSteps={4}/>
      <S.Wrapper data-testid="payment-step">
        <Container>
          <Row>
            <Col lg={3}>
              <S.StyledDivisor title="Condições de pagamento" text="Escolha uma das opções de pagamento que nós oferecemos."/>
            </Col>

            <Col lg={8}>
              <PaymentMethod portoCreditCardState={portoCreditCardState}/>
              <CreditCard portoCreditCardIsSelected={portoCreditCardState[0]} creditCardForm={creditCardFormState}/>
            </Col>
          </Row>
        </Container>

        <S.BottomBar>
          <Button
          color="secondary"
          onClick={() => console.log(creditCardForm)}
          disabled={portoCreditCardIsSelected ? creditCardForm.parcelOption.id === 0 : !allIsValid}
          >Continuar</Button>
        </S.BottomBar>
      </S.Wrapper>
    </>
  )
}

export default PaymentStep
