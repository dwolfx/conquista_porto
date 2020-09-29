import { IItemsProps } from 'components/Dropdown'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'
import { IActions } from './types'

export const generateActionMenuOptions = (
  fundInfo: TObjectiveFunds,
  actions?: IActions
): IItemsProps[] => {
  let menuOptions: IItemsProps[] = [
    {
      icon: 'add',
      text: 'Investir',
      onClick: () => actions?.invest(fundInfo),
    },
  ]

  if (fundInfo.invested) {
    menuOptions = [
      ...menuOptions,
      {
        icon: 'minus',
        text: 'Resgatar',
        onClick: () => actions?.redeem(fundInfo),
      },
    ]
  }

  // if (fundInfo.) {
  //   menuOptions = [
  //     ...menuOptions,
  //     {
  //       icon: 'list',
  //       text: 'Extrato de movimentações',
  //       onClick: () => actions?.extract(fundInfo),
  //     },
  //   ]
  // }

  if (fundInfo.available) {
    menuOptions = [
      ...menuOptions,
      {
        icon: 'money',
        text: 'Vincular disponível ao objetivo',
        onClick: () => actions?.attach(fundInfo),
      },
    ]
  }

  return [
    ...menuOptions,
    {
      icon: 'information',
      text: 'Mais informações',
      onClick: () => actions?.info(fundInfo),
    },
  ]
}
