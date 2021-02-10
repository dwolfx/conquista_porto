import React from 'react'
import { useSelector } from 'react-redux'
import InputMask from 'react-input-mask'
import Drawer from 'components/Drawer'
import moment from 'moment'

import useMedia from 'hooks/useMedia'
import {
  ICreditCard,
  ITripInsuranceCreditCard,
} from 'store/modules/TripInsurance/CreditCard/types'
import { IForm } from 'pages/TripInsurance/Creation/types'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { capitalize, formatMoney } from 'helpers'
import IconExporter from 'components/IconExporter'
import { validationInputError } from 'helpers/validators'
import { TFlagName } from '../PaymentStep/types'
import { getFlagCode } from '../PaymentStep/utils'
import {
  creditCardError,
  isNotPortoCreditCardError,
  isRequestInputCreditCardError,
  setCreditCardFlag,
  validateCreditCardNumber,
} from '../PaymentStep/CreditCard/CreditCardNumberInput/utils'
import {
  validityError,
  validityErrorCvc,
} from '../PaymentStep/CreditCard/utils'

import * as tSelect from 'components/Inputs/Select/types'
import * as S from 'pages/TripInsurance/Hire/CompanionStep/EditDrawer/styles'
import * as t from './types'
import * as s from './styles'
import {
  IPlan,
  ITripInsuranceQuotation,
} from 'store/modules/TripInsurance/InsuranceQuotation/types'

interface ITouchCheck {
  isCardNumber: boolean
  isHolderName: boolean
  isDueDate: boolean
  isCardVerificationCode: boolean
}

const DrawerChangePayment: React.FC<t.IDrawerChangePayment> = ({
  isOpen,
  handleClose,
}: t.IDrawerChangePayment) => {
  const isMobileOrTablet = useMedia('sm')
  const { updateForm, form } = useFormFluxManagement<IForm>()

  const { creditCardData } = useSelector(
    (state: { tripInsuranceCreditCard: ITripInsuranceCreditCard }) => ({
      creditCardData: state.tripInsuranceCreditCard.data,
    })
  )

  const cardStringName = (value: ICreditCard): string =>
    `Porto Seguro ${capitalize(value.Bandeira)} ${capitalize(
      value.Tipo
    )} **** ${value.UltimosDigitos}`

  // USE STATE
  const [selectInstallment, setSelectInstallment] = React.useState<
    tSelect.TSelected
  >({
    id: 0,
    name: '',
  })
  const [installments, setInstallments] = React.useState<tSelect.TOptions[]>([
    {
      id: 0,
      text: '',
    },
  ])
  const [paymentMethodSelect, setPaymentMethodSelect] = React.useState<
    tSelect.TSelected
  >({
    id: 0,
    name: '',
  })
  const [paymentMethods, setPaymentMethods] = React.useState<
    tSelect.TOptions[]
  >([
    {
      id: 0,
      text: '',
    },
  ])

  const [initPaymentMethod, setInitPaymentMethod] = React.useState<
    tSelect.TSelected
  >({
    id: 0,
    name: '',
  })
  const [initInstallment, setInitInstallment] = React.useState<
    tSelect.TSelected
  >({
    id: 0,
    name: '',
  })

  const [isCardPorto, setIsCardPorto] = React.useState<boolean>(
    form.pagamento?.isCartaoPorto ?? false
  )
  const [flagCode, setFlagCode] = React.useState<number>(0)
  const [firstNumberCard, setFirstNumberCard] = React.useState<string>('')
  const [secondNumberCard, setSecondNumberCard] = React.useState<string>('')
  const [thirdNumberCard, setThirdNumberCard] = React.useState<string>('')
  const [fourthNumberCard, setFourtNumberCard] = React.useState<string>('')
  const [holderName, setHolderName] = React.useState<string>('')
  const [mounthValidity, setMounthValidity] = React.useState<string>('')
  const [yearValidaty, setYearValidaty] = React.useState<string>('')

  const [isRestForm, setIsRestForm] = React.useState<boolean>(false)
  const [cardNumber, setCardNumber] = React.useState<string>('')
  const [dueDateCard, setDueDateCard] = React.useState<string>('')
  const [cvcState, setCvcState] = React.useState<string>('')
  const [flagNameState, setFlagNameState] = React.useState<TFlagName>('')
  const [choosePlanSelect, setChoosePlanSelect] = React.useState<IPlan>()
  const [selectedCreditCardIndex, setSelectedCreditCardIndex] = React.useState<
    number
  >()
  const [isNumberValidState, setIsNumberValidState] = React.useState<boolean>(
    false
  )
  const [touchInputValid, setTouchInputValid] = React.useState<ITouchCheck>({
    isCardNumber: false,
    isHolderName: false,
    isDueDate: false,
    isCardVerificationCode: false,
  })

  const { tripInsuranceQuotations } = useSelector(
    (state: { tripInsuranceQuotation: ITripInsuranceQuotation }) => ({
      tripInsuranceQuotations:
        state.tripInsuranceQuotation.data?.ViagemPacote.pacotes,
    })
  )

  // USE EFFECT
  React.useEffect(() => {
    if (tripInsuranceQuotations && tripInsuranceQuotations.length) {
      setChoosePlanSelect(
        tripInsuranceQuotations?.find(
          value => value.codigoPlano === form.pacoteEscolhido
        )
      )
    }
  }, [tripInsuranceQuotations, form.pacoteEscolhido])

  React.useEffect(() => {
    if (
      choosePlanSelect &&
      choosePlanSelect?.formasPagamento &&
      choosePlanSelect?.formasPagamento.listaParcelamentoCartaoPorto &&
      choosePlanSelect?.formasPagamento.listaParcelamentoCartaoPorto.length &&
      choosePlanSelect?.formasPagamento.listaParcelamentoCartao &&
      choosePlanSelect?.formasPagamento.listaParcelamentoCartao.length
    ) {
      const formPaymentArray = isCardPorto
        ? choosePlanSelect?.formasPagamento.listaParcelamentoCartaoPorto
        : choosePlanSelect?.formasPagamento.listaParcelamentoCartao

      setInstallments(
        formPaymentArray.map(value => ({
          id: value.id,
          text: `${value.descricao} de ${formatMoney(value.valor)}`,
          onClick: () =>
            setSelectInstallment({
              id: value.id,
              name: `${value.descricao} de ${formatMoney(value.valor)}`,
            }),
        }))
      )
    }
  }, [choosePlanSelect, isCardPorto])

  React.useEffect(() => {
    if (installments && installments.length && form && form.pagamento) {
      const findInstallment = installments.find(
        value => Number(value.id) === form.pagamento?.quantidadeParcelas
      )
      if (findInstallment) {
        setSelectInstallment({
          id: findInstallment.id,
          name: findInstallment?.text,
        })
        setInitInstallment({
          id: findInstallment.id,
          name: findInstallment?.text,
        })
      }
    }
  }, [installments, form])

  React.useEffect(() => {
    if (
      creditCardData &&
      creditCardData.creditCards &&
      creditCardData.creditCards.length
    ) {
      const options = creditCardData.creditCards.map((value, id) => ({
        id,
        text: cardStringName(value),
        onClick: () => {
          setPaymentMethodSelect({
            id,
            name: cardStringName(value),
          })
          setIsCardPorto(true)
        },
      }))

      setPaymentMethods([
        ...options,
        {
          id: options.length,
          text: 'Outro cartão',
          onClick: () => {
            setPaymentMethodSelect({
              id: options.length,
              name: 'Outro cartão',
            })
            setIsCardPorto(false)
          },
        },
      ])
    }
  }, [creditCardData])

  React.useEffect(() => {
    if (
      creditCardData &&
      creditCardData.creditCards &&
      creditCardData.creditCards.length &&
      form &&
      form.pagamento &&
      form.pagamento.quartoNumero
    ) {
      if (form.pagamento.isCartaoPorto) {
        const dataCard = creditCardData.creditCards.find(
          ({ UltimosDigitos }) =>
            UltimosDigitos === form.pagamento?.quartoNumero
        )
        if (dataCard) {
          const itemSelectPaymentMethod = paymentMethods.find(
            value => value.text === cardStringName(dataCard)
          )
          if (itemSelectPaymentMethod) {
            setPaymentMethodSelect({
              id: itemSelectPaymentMethod.id,
              name: cardStringName(dataCard),
            })
            setInitPaymentMethod({
              id: itemSelectPaymentMethod.id,
              name: cardStringName(dataCard),
            })
          }
        }
      } else {
        setPaymentMethodSelect({
          id: creditCardData.creditCards.length,
          name: 'Outro cartão',
        })
        setInitPaymentMethod({
          id: creditCardData.creditCards.length,
          name: 'Outro cartão',
        })

        const strippedValue = `${form.pagamento.primeiroNumero}${form.pagamento.segundoNumero}${form.pagamento.terceiroNumero}${form.pagamento.quartoNumero}`

        setCardNumber(strippedValue)
        setIsNumberValidState(validateCreditCardNumber(strippedValue))
        setCreditCardFlag(strippedValue, setFlagNameState)
        setDueDateCard(
          `${form.pagamento.mesValidade}/${form.pagamento.anoValidade}`
        )
        setYearValidaty(form.pagamento.anoValidade)
        setMounthValidity(form.pagamento.mesValidade)
        setHolderName(form.pagamento.nomeTitular)
        setCvcState(String(form.pagamento.codigoSeguranca))
        setFirstNumberCard(
          strippedValue.length >= 4 ? strippedValue.slice(0, 4) : ''
        )
        setSecondNumberCard(
          strippedValue.length >= 8 ? strippedValue.slice(4, 8) : ''
        )
        setThirdNumberCard(
          strippedValue.length >= 12 ? strippedValue.slice(8, 12) : ''
        )
        setFourtNumberCard(
          strippedValue.length >= 16 ? strippedValue.slice(12, 16) : ''
        )
      }
    }
  }, [paymentMethods, form, creditCardData])

  React.useEffect(() => {
    if (
      creditCardData &&
      creditCardData.creditCards &&
      creditCardData.creditCards.length &&
      paymentMethodSelect &&
      form &&
      form.pagamento
    ) {
      setSelectedCreditCardIndex(Number(paymentMethodSelect.id))
      if (paymentMethodSelect.name !== initPaymentMethod.name) {
        setSelectInstallment({
          id: 0,
          name: '',
        })
        clearForm()
      } else {
        setSelectInstallment(initInstallment)
      }
    }
  }, [
    paymentMethodSelect,
    initInstallment,
    creditCardData,
    form,
    initPaymentMethod,
  ])

  React.useEffect(() => {
    if (flagNameState && form && form.pagamento) {
      setFlagCode(
        flagNameState
          ? getFlagCode(form.pagamento?.isCartaoPorto ?? false, flagNameState)
          : 0
      )
    }
  }, [flagNameState, form, form.pagamento])

  React.useEffect(() => {
    const validViewrestForm =
      initPaymentMethod.name === 'Outro cartão' ||
      paymentMethodSelect.name !== initPaymentMethod.name
    setIsRestForm(initPaymentMethod && paymentMethodSelect && validViewrestForm)
  }, [initPaymentMethod, paymentMethodSelect])

  const isDisabled = (): boolean => {
    if (isRestForm) {
      const validForm =
        !!cvcState &&
        cvcState.length === 3 &&
        !!yearValidaty &&
        !!String(flagCode) &&
        !!mounthValidity &&
        !!firstNumberCard &&
        !!holderName &&
        !!selectInstallment.id &&
        !!fourthNumberCard &&
        !!secondNumberCard &&
        !!thirdNumberCard

      return !validForm
    }

    return form.pagamento?.quantidadeParcelas === Number(selectInstallment.id)
  }

  const handlerCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strippedValue = e.target.value.replace(/\D/g, '')
    setIsNumberValidState(validateCreditCardNumber(e.target.value))
    setCardNumber(strippedValue)

    if (strippedValue && strippedValue.length) {
      setCreditCardFlag(strippedValue, setFlagNameState)

      setFirstNumberCard(
        strippedValue.length >= 4 ? strippedValue.slice(0, 4) : ''
      )
      setSecondNumberCard(
        strippedValue.length >= 8 ? strippedValue.slice(4, 8) : ''
      )
      setThirdNumberCard(
        strippedValue.length >= 12 ? strippedValue.slice(8, 12) : ''
      )
      setFourtNumberCard(
        strippedValue.length >= 16 ? strippedValue.slice(12, 16) : ''
      )
    }
  }

  const hasError = () => {
    if (
      (cardNumber && cardNumber.length >= 19 && !isNumberValidState) ||
      (cardNumber &&
        cardNumber.length >= 4 &&
        flagNameState !== 'mastercard' &&
        flagNameState !== 'visa')
    ) {
      return creditCardError
    }

    if (
      creditCardData &&
      creditCardData?.creditCards &&
      creditCardData?.creditCards.length &&
      selectedCreditCardIndex !== undefined &&
      fourthNumberCard &&
      creditCardData?.creditCards.length > selectedCreditCardIndex &&
      cardNumber.length >= 16 &&
      creditCardData?.creditCards[selectedCreditCardIndex].UltimosDigitos !==
        fourthNumberCard
    ) {
      return isNotPortoCreditCardError
    }

    if (touchInputValid.isCardNumber && !cardNumber) {
      return isRequestInputCreditCardError
    }

    return undefined
  }

  const hasErrorDue = () => {
    if (touchInputValid.isDueDate && !dueDateCard) {
      return isRequestInputCreditCardError
    }

    if (touchInputValid.isDueDate && dueDateCard && dueDateCard.length < 7) {
      return validityError
    }

    if (touchInputValid.isDueDate && dueDateCard && dueDateCard.length === 7) {
      const [month] = dueDateCard.split('/')

      if (Number(month) > 12) {
        return validityError
      }

      const validate = moment(dueDateCard, 'MM/YYYY')

      if (moment().isAfter(validate)) {
        return validityError
      }
    }

    return undefined
  }

  const hasErrorCvc = () => {
    if (touchInputValid.isCardVerificationCode && !cvcState) {
      return isRequestInputCreditCardError
    }

    if (cvcState && cvcState.length > 3) {
      return validityErrorCvc
    }

    return undefined
  }

  const clearForm = () => {
    setCardNumber('')
    setFlagNameState('')
    setDueDateCard('')
    setCvcState('')
    setFlagCode(0)
    setMounthValidity('')
    setYearValidaty('')
    setFirstNumberCard('')
    setSecondNumberCard('')
    setHolderName('')
    setThirdNumberCard('')
    setFourtNumberCard('')
    setTouchInputValid({
      isCardNumber: false,
      isHolderName: false,
      isDueDate: false,
      isCardVerificationCode: false,
    })
  }

  const footerButton = () => (
    <s.Button
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-name="salvar alterações"
      disabled={isDisabled()}
      onClick={onSubmit}
    >
      SALVAR ALTERAÇÕES
    </s.Button>
  )

  const onSubmit = () => {
    if (form && form.pagamento) {
      if (isRestForm) {
        updateForm({
          ...form,
          pagamento: {
            ...form.pagamento,
            codigoBandeira: flagCode,
            primeiroNumero: firstNumberCard,
            segundoNumero: secondNumberCard,
            terceiroNumero: thirdNumberCard,
            quartoNumero: fourthNumberCard,
            nomeTitular: holderName,
            mesValidade: mounthValidity,
            anoValidade: yearValidaty,
            quantidadeParcelas: Number(selectInstallment.id),
            isCartaoPorto: isCardPorto,
          },
        })
        clearForm()
        setIsRestForm(false)
      } else {
        updateForm({
          ...form,
          pagamento: {
            ...form.pagamento,
            quantidadeParcelas: Number(selectInstallment.id),
          },
        })
      }
      handleClose()
    }
  }

  const renderContent = () => (
    <s.Container>
      <s.SelectWrapper>
        <s.Select
          label="Forma de Pagamento"
          options={paymentMethods}
          selected={paymentMethodSelect}
        ></s.Select>
      </s.SelectWrapper>
      <s.SelectWrapper>
        <s.Select
          label="Número de Parcelas"
          options={installments}
          selected={selectInstallment}
        ></s.Select>
      </s.SelectWrapper>
      {isRestForm && (
        <>
          <InputMask
            mask="9999 9999 9999 9999"
            value={cardNumber}
            maskPlaceholder={null}
            onChange={handlerCardChange}
            onBlur={() => {
              setTouchInputValid({
                ...touchInputValid,
                isCardNumber: true,
              })
            }}
          >
            <s.inputCard
              label="Número do cartão"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              error={hasError()}
              suffix={flagNameState && <IconExporter name={flagNameState} />}
            />
          </InputMask>
          <s.InputsDrawerPayment
            label="nome impresso no cartão"
            placeholder="Digite"
            name="nomeTitular"
            value={holderName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHolderName(e.target.value)
            }
            error={validationInputError(
              holderName,
              touchInputValid.isHolderName
            )}
            onBlur={() => {
              setTouchInputValid({
                ...touchInputValid,
                isHolderName: true,
              })
            }}
          />
          <InputMask
            mask="99/9999"
            value={dueDateCard}
            maskPlaceholder={null}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDueDateCard(e.target.value)
              if (e.target.value && e.target.value.length === 7) {
                const [month, year] = e.target.value.split('/')
                setMounthValidity(month)
                setYearValidaty(year)
              }
            }}
            onBlur={() => {
              setTouchInputValid({
                ...touchInputValid,
                isDueDate: true,
              })
            }}
          >
            <s.InputsDrawerPayment
              label="validade"
              error={hasErrorDue()}
              placeholder="00/0000"
            />
          </InputMask>
          <InputMask
            mask="999"
            value={cvcState}
            maskPlaceholder={null}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCvcState(e.target.value)
            }
            onBlur={() => {
              setTouchInputValid({
                ...touchInputValid,
                isCardVerificationCode: true,
              })
            }}
          >
            <s.InputsDrawerPayment
              label="cvc"
              placeholder="000"
              error={hasErrorCvc()}
            />
          </InputMask>
        </>
      )}
    </s.Container>
  )

  if (isMobileOrTablet) {
    return (
      <S.Modal
        modalTitle="Alterar dados"
        isOpen={isOpen}
        handleClose={handleClose}
        footer={footerButton()}
      >
        {renderContent()}
      </S.Modal>
    )
  }

  return (
    <Drawer
      isOpen={isOpen}
      handleClose={handleClose}
      drawerTitle="Alterar dados"
      footer={footerButton()}
    >
      {renderContent()}
    </Drawer>
  )
}

export default DrawerChangePayment
