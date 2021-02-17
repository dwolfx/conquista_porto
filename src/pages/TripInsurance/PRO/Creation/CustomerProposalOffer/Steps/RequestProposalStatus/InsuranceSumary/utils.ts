import { formatMoney } from 'helpers'
import { ICreditCardInstallment } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { IForm } from 'pages/TripInsurance/PRO/types'

export const getTotal = (isCartaoPorto: boolean, form: IForm): string => {
  let totalObject: ICreditCardInstallment | undefined = {
    valor: '',
    id: '',
    descricao: '',
  }

  if (isCartaoPorto) {
    totalObject =
      form.formasPagamento?.listaParcelamentoCartaoPorto[
        form.pagamento ? form.pagamento.quantidadeParcelas - 1 : 0
      ]
  } else {
    totalObject =
      form.formasPagamento?.listaParcelamentoCartao[
        form.pagamento ? form.pagamento.quantidadeParcelas - 1 : 0
      ]
  }

  return totalObject && totalObject.descricao.includes('x')
    ? `${totalObject.descricao} de ${formatMoney(totalObject.valor)}`
    : `1x de ${formatMoney(
        totalObject?.valor ?? ''
      )} (${totalObject?.descricao ?? ''})`
}
