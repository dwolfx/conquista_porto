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
      onClick: () => {
        if (actions?.invest) {
          actions.invest(fundInfo)
        }
      },
    },
  ]

  if (fundInfo.invested) {
    menuOptions = [
      ...menuOptions,
      {
        icon: 'minus',
        text: 'Resgatar',
        onClick: () => {
          if (actions?.redeem) {
            actions.redeem(fundInfo)
          }
        },
      },
    ]
  }

  if (fundInfo.invested) {
    menuOptions = [
      ...menuOptions,
      {
        icon: 'list',
        text: 'Extrato de movimentações',
        onClick: () => {
          if (actions?.extract) {
            actions?.extract(fundInfo)
          }
        },
      },
    ]
  }

  if (fundInfo.available) {
    menuOptions = [
      ...menuOptions,
      {
        icon: 'money',
        text: 'Vincular disponível ao objetivo',
        onClick: () => {
          if (actions?.link) {
            actions.link(fundInfo)
          }
        },
      },
    ]
  }

  return [
    ...menuOptions,
    {
      icon: 'information',
      text: 'Mais informações',
      onClick: () => {
        if (actions?.info) {
          actions.info(fundInfo)
        }
      },
    },
  ]
}
