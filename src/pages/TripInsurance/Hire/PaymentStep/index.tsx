import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import StepBar from 'pages/TripInsurance/commons/StepBar'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'
import { ITripInsuranceCreditCard } from 'store/modules/TripInsurance/CreditCard/types'
import { IForm, Steps } from 'pages/TripInsurance/Creation/types'
import { StepComponent } from 'hooks/FluxManagement/types'

import PaymentMethod from './PaymentMethod'
import CreditCard from './CreditCard'

import { IParcelOptionState, TFlagName } from './types'
import { getFlagCode } from './utils'
import * as S from './styles'

const PaymentStep: StepComponent = () => {
  const { instantiate } = useStackFluxManagement<StepComponentProps>()
  const { updateForm } = useFormFluxManagement<IForm>()
  const [selectedCreditCard, setSelectedCreditCard] = useState(0)
  const [parcelOption, setParcelOption] = useState<IParcelOptionState>({
    id: 0,
    name: '',
  })
  const [cardNumber, setCardNumber] = useState<string>('')
  const [isNumberValid, setIsNumberValid] = useState<boolean>(false)
  const flagNameState = useState<TFlagName>('')
  const [name, setName] = useState<string>('')
  const validityDateState = useState<string>('')
  const validityHasErrorState = useState(false)
  const cvcState = useState<string>('')

  const { creditCardData } = useSelector(
    (state: { tripInsuranceCreditCard: ITripInsuranceCreditCard }) => ({
      creditCardData: state.tripInsuranceCreditCard.data,
    })
  )

  const allIsValid =
    parcelOption.id !== 0 &&
    cardNumber.length === 19 &&
    !(
      creditCardData?.creditCards &&
      creditCardData?.creditCards.length > selectedCreditCard &&
      creditCardData?.creditCards[selectedCreditCard].UltimosDigitos !==
        cardNumber.slice(15, 19)
    ) &&
    isNumberValid &&
    (flagNameState[0] === 'mastercard' || flagNameState[0] === 'visa') &&
    !!name &&
    validityDateState[0].length === 7 &&
    !validityHasErrorState[0] &&
    cvcState[0].length === 3

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
                selectedCreditCardState={[
                  selectedCreditCard,
                  setSelectedCreditCard,
                ]}
                creditCards={creditCardData?.creditCards}
                setParcelOption={setParcelOption}
              />
              <CreditCard
                portoCreditCardIsNotSelected={
                  creditCardData?.creditCards &&
                  creditCardData.creditCards.length > 0
                    ? selectedCreditCard === creditCardData?.creditCards?.length
                    : true
                }
                selectedCreditCardIndex={selectedCreditCard}
                parcelOptionState={[parcelOption, setParcelOption]}
                cardNumberState={[cardNumber, setCardNumber]}
                isNumberValidState={[isNumberValid, setIsNumberValid]}
                flagNameState={flagNameState}
                setName={setName}
                validityDateState={validityDateState}
                validityHasErrorState={validityHasErrorState}
                cvcState={cvcState}
              />
            </Col>
          </Row>
        </Container>

        <S.BottomBar>
          <Button
            disabled={!allIsValid}
            color="secondary"
            onClick={() => {
              updateForm({
                pagamento: {
                  codigoBandeira: getFlagCode(
                    !(creditCardData?.creditCards &&
                    creditCardData.creditCards.length > 0
                      ? selectedCreditCard > creditCardData?.creditCards?.length
                      : true),
                    flagNameState[0]
                  ),
                  primeiroNumero: cardNumber.slice(0, 4),
                  segundoNumero: cardNumber.slice(5, 9),
                  terceiroNumero: cardNumber.slice(10, 14),
                  quartoNumero: cardNumber.slice(15, 19),
                  codigoSeguranca: +cvcState[0],
                  mesValidade: `${validityDateState[0].slice(0, 2)}`,
                  anoValidade: `${validityDateState[0].slice(3, 7)}`,
                  nomeTitular: name,
                  quantidadeParcelas: parcelOption.id,
                  isCartaoPorto: !(creditCardData?.creditCards &&
                  creditCardData.creditCards.length > 0
                    ? selectedCreditCard > creditCardData?.creditCards?.length
                    : true),
                },
              })
              instantiate(Steps.sumaryStep)
            }}
          >
            Continuar
          </Button>
        </S.BottomBar>
      </S.Wrapper>
    </>
  )
}

export default PaymentStep
