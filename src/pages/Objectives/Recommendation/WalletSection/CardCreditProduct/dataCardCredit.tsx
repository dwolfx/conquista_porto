import React from 'react'

import { dict } from 'components/IconExporter'
import Popover from 'components/Popover'
import Text from 'components/Text'

import { DashedText } from '../styles'
import { InformationIcon, PopoverContentContainer } from './styles'

interface IProductCard {
  [key: string]: {
    icon: keyof typeof dict
    message: React.ReactNode
    items: {
      name: string
      value: string
      info?: React.ReactNode
      checked?: boolean
    }[]
  }
}

const lancesPopoverContent = (
  <Text color="gray5" bold>
    Uma forma de aumentar a sua chance contemplação, em que você oferece uma
    quantia maior que a parcela, como num leilão.
  </Text>
)

const adesaoPopoverContent = (
  <Text color="gray5" bold>
    A taxa que paga para se iniciar o consórcio. O preço é proporcional ao valor
    da carta de crédito.
  </Text>
)

const taxaPopoverContent = (
  <Text color="gray5" bold>
    A taxa varia de acordo com a quantidade de parcelas contratadas.
  </Text>
)

export const productCard: IProductCard = {
  Financiamento: {
    icon: 'money',
    message: (
      <>
        O financiamento servirá como complemento para você alcançar o objetivo.
      </>
    ),
    items: [
      {
        name: 'Parcelas de',
        value: '12 até 60 meses',
      },
      {
        name: 'Taxa de juros',
        value: 'Pendente',
        info: taxaPopoverContent,
      },
    ],
  },
  'Consórcio de Veículo': {
    icon: 'car2',
    message: (
      <>
        Você pode usar os rendimentos da sua carteira para dar{' '}
        <Popover
          content={
            <PopoverContentContainer>
              {lancesPopoverContent}
            </PopoverContentContainer>
          }
        >
          <DashedText>lances</DashedText>
        </Popover>{' '}
        <Popover
          content={
            <PopoverContentContainer>
              {lancesPopoverContent}
            </PopoverContentContainer>
          }
        >
          <InformationIcon />
        </Popover>{' '}
        no consórcio.
      </>
    ),
    items: [
      {
        name: 'Planos de',
        value: '50 até 80 meses',
      },
      {
        name: 'Taxa administrativa',
        value: 'A partir de 15,5%',
        info: taxaPopoverContent,
      },
    ],
  },
  'Consórcio de Imóvel': {
    icon: 'homewithwindow',
    message: (
      <>
        Você pode usar os rendimentos da sua carteira para dar{' '}
        <Popover
          content={
            <PopoverContentContainer>
              {lancesPopoverContent}
            </PopoverContentContainer>
          }
        >
          <DashedText>lances</DashedText>
        </Popover>{' '}
        <Popover
          content={
            <PopoverContentContainer>
              {lancesPopoverContent}
            </PopoverContentContainer>
          }
        >
          <InformationIcon />
        </Popover>{' '}
        no consórcio.
      </>
    ),
    items: [
      {
        name: 'Parcele em',
        value: 'Até 200 meses',
      },
      {
        name: 'Taxa de adesão',
        value: '2%',
        info: adesaoPopoverContent,
      },
      {
        name: 'Taxa administrativa',
        value: 'A partir de 15%',
        info: taxaPopoverContent,
      },
    ],
  },
}
