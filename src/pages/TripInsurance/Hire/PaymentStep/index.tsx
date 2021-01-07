import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import StepBar from 'pages/TripInsurance/commons/StepBar'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { ITripInsuranceCreditCard } from 'store/modules/TripInsurance/CreditCard/types'
import { IForm } from 'pages/TripInsurance/Creation/types'
import { StepComponent } from 'hooks/FluxManagement/types'

import PaymentMethod from './PaymentMethod'
import CreditCard from './CreditCard'

import { ICreditCardForm } from './types'
import * as S from './styles'

const PaymentStep: StepComponent = () => {
  const { updateForm } = useFormFluxManagement<IForm>()
  const selectedCreditCardState = React.useState(0)
  const creditCardFormState = React.useState<ICreditCardForm>({
    parcelOption: { id: 0, name: '' },
    cardNumber: '',
    name: '',
    validity: '',
    cvc: '',
  })
  const [selectedCreditCard, setSelectedCreditCard] = selectedCreditCardState
  const [creditCardForm] = creditCardFormState
  const allIsValid =
    creditCardForm.parcelOption.id !== 0 &&
    !!creditCardForm.cardNumber &&
    !!creditCardForm.name &&
    !!creditCardForm.validity &&
    !!creditCardForm.cvc

  const { creditCardData } = useSelector(
    (state: { tripInsuranceCreditCard: ITripInsuranceCreditCard }) => ({
      creditCardData: state.tripInsuranceCreditCard.data,
    })
  )

  // Seleciona o cartão Porto Seguro caso exista no serviço
  useEffect(() => {
    if (creditCardData?.creditCards?.length) {
      setSelectedCreditCard(0)
    }
  }, [creditCardData, setSelectedCreditCard])

  return (
    <>
      <StepBar actualStep={3} totalNumberOfSteps={4} />
      <S.Wrapper data-testid="payment-step">
        <Container>
          <Row>
            <Col lg={3}>
              <S.StyledDivisor
                title="Condições de pagamento"
                text="Escolha uma das opções de pagamento que nós oferecemos."
              />
            </Col>

            <Col lg={8}>
              <PaymentMethod
                selectedCreditCardState={selectedCreditCardState}
                creditCards={creditCardData?.creditCards}
                setCreditCardFormValue={creditCardFormState[1]}
              />
              <CreditCard
                portoCreditCardIsNotSelected={
                  creditCardData?.creditCards &&
                  creditCardData.creditCards.length > 0
                    ? selectedCreditCard > creditCardData?.creditCards?.length
                    : true
                }
                creditCardForm={creditCardFormState}
              />
            </Col>
          </Row>
        </Container>

        <S.BottomBar>
          <Button
            color="secondary"
            onClick={() =>
              updateForm({
                pagamento: {
                  codigoBandeira: 5,
                  primeiroNumero: creditCardForm.cardNumber.slice(0, 4),
                  segundoNumero: creditCardForm.cardNumber.slice(4, 8),
                  terceiroNumero: creditCardForm.cardNumber.slice(8, 12),
                  quartoNumero: creditCardForm.cardNumber.slice(12, 16),
                  codigoSeguranca: +creditCardForm.cvc,
                  mesValidade: `${creditCardForm.validity.slice(0, 2)}`,
                  anoValidade: `${creditCardForm.validity.slice(3, 7)}`,
                  nomeTitular: creditCardForm.name,
                  quantidadeParcelas: creditCardForm.parcelOption.id,
                  isCartaoPorto: !(creditCardData?.creditCards &&
                  creditCardData.creditCards.length > 0
                    ? selectedCreditCard > creditCardData?.creditCards?.length
                    : true),
                },
              })
            }
            disabled={!allIsValid}
          >
            Continuar
          </Button>
        </S.BottomBar>
      </S.Wrapper>
    </>
  )
}

export default PaymentStep
