import { useSelector } from 'react-redux'
import { IState } from 'pages/CreditCard/Creation/ThirdStep/types'

export enum ECivilStateLabel {
  'Casado' = 1,
  'Solteiro',
  'Viúvo',
  'Outros',
}

export enum ESexLabel {
  'M' = 'Masculino',
  'F' = 'Feminino',
}

export enum ECardFlagLabel {
  'Visa' = 1,
  'Mastercard',
  'Outros',
}

export const OcuppationLabel = (id: string) => {
  const { creditCardOccupation } = useSelector((state: IState) => ({
    creditCardOccupation: state.creditCardOccupation,
  }))

  const selectedOccupationName = creditCardOccupation.data?.profissoesVO
    .flatMap(item => item)
    .find(item => id === item.codProfissaoProduto)

  return selectedOccupationName ? selectedOccupationName.nome : ''
}
