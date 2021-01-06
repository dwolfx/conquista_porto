import { formatMoney } from 'helpers'
import { ICreditCardInstallment } from 'store/modules/TripInsurance/InsuranceQuotation/types'

export const getTheSixthInstallmentOrLessFormated = (
  generalCreditCardInstallments: ICreditCardInstallment[],
  portoSeguroCreditCardInstallments: ICreditCardInstallment[],
  isPortoSeguroCard: boolean
): string => {
  if (isPortoSeguroCard) {
    const lastInstallmentIndex = portoSeguroCreditCardInstallments.length - 1
    return `${portoSeguroCreditCardInstallments[
      lastInstallmentIndex
    ].descricao.toUpperCase()} SEM JUROS DE ${formatMoney(
      portoSeguroCreditCardInstallments[lastInstallmentIndex].valor
    )}`
  }

  const lastInstallmentIndex = generalCreditCardInstallments.length - 1
  if (generalCreditCardInstallments.length >= 6)
    return `6X SEM JUROS DE ${formatMoney(
      generalCreditCardInstallments[5].valor
    )}`
  return `${generalCreditCardInstallments[
    lastInstallmentIndex
  ].descricao.toUpperCase()} SEM JUROS DE ${formatMoney(
    generalCreditCardInstallments[lastInstallmentIndex].valor
  )}`
}

export const getUpfrontPaymentFormated = (
  generalCreditCardInstallments: ICreditCardInstallment[],
  portoSeguroCreditCardInstallments: ICreditCardInstallment[],
  isPortoSeguroCard: boolean
): string => {
  if (isPortoSeguroCard) {
    const upfrontPayment = portoSeguroCreditCardInstallments.find(
      installment =>
        installment.descricao.toLowerCase() === 'à vista' ||
        installment.id === '1'
    )
    if (upfrontPayment) {
      return `${formatMoney(upfrontPayment.valor)} à vista`
    }
    return `${formatMoney(portoSeguroCreditCardInstallments[0].valor)} à vista`
  }

  const upfrontPayment = generalCreditCardInstallments.find(
    installment =>
      installment.descricao.toLowerCase() === 'à vista' ||
      installment.id === '1'
  )
  if (upfrontPayment) {
    return `${formatMoney(upfrontPayment.valor)} à vista`
  }
  return `${formatMoney(generalCreditCardInstallments[0].valor)} à vista`
}
