import { dict } from 'components/IconExporter'

interface IProductCard {
  [key: string]: {
    icon: keyof typeof dict,
    message: string,
    items: {
      name: string,
      value: string,
      info?: boolean
    }[]
  }
}

export const productCard:IProductCard = {
  'Financiamento': {
    icon: 'money',
    message: 'Uma forma de ter o seu bem sem esperar um longo prazo.',
    items: [
      {
        name: 'Parcelas de',
        value: '12 até 60 meses',
      },
    ],
  },
  'Consórcio de Veículo': {
    icon: 'car2',
    message:
      'Uma maneira de ter o seu bem com parcelas acessíveis e sem juros.',
    items: [
      {
        name: 'Planos de',
        value: '50 até 80 meses',
      },
      {
        name: 'Taxa administrativa',
        value: 'A partir de 15,5%',
        info: true,
      },
    ],
  },
  'Consórcio de Imóvel': {
    icon: 'homewithwindow',
    message:
      'Uma maneira de ter o seu bem com parcelas acessíveis e sem juros.',
    items: [
      {
        name: 'Parcele em',
        value: 'Até 200 meses',
      },
      {
        name: 'Taxa de adesão',
        value: '2%',
      },
      {
        name: 'Taxa administrativa',
        value: 'A partir de 16%',
        info: true,
      },
    ],
  }
}
