import travelSecurityImg from 'assets/images/pages/Objectives/travelSecurity.png'
import lifeSecurityImg from 'assets/images/pages/Objectives/lifeSecurity.png'
import creditCardImg from 'assets/images/pages/Objectives/creditCard.png'

import { dict } from 'components/IconExporter'

export type TAdditionalKey = 'credit_card' | 'life_security' | 'travel_security'

interface IProps {
  [key: string]: {
    category: string
    title: string
    text: string
    image: string
    productPath: string
    modalInfos: {
      title: string
      text: string
      items: {
        icon: keyof typeof dict,
        text: string
      }[]
    }
  }
}

const productData: IProps = {
  travel_security: {
    category: 'Seguro Viagem',
    title: 'Leve a tranquilidade na mala',
    text:
      'Planos e coberturas pensados para você aproveitar ao máximo a sua viagem.',
    image: travelSecurityImg,
    productPath: '/seguro-viagem',
    modalInfos: {
      title: 'Seguro Viagem Porto Seguro',
      text: 'Conheça as principais vantagens:',
      items: [
        {
          icon: 'creditcard',
          text: 'Pagamento parcelado no cartão de crédito',
        },
        {
          icon: 'globe',
          text: 'Contratação 100% on-line',
        },
        {
          icon: 'phone',
          text: 'Assistência 24 horas em português de qualquer lugar do mundo',
        },
        {
          icon: 'baggage',
          text: 'Assistência em caso de extravio de bagagem',
        },
        {
          icon: 'usermedic',
          text: 'Coberturas médicas, hospitalares e odontológicas',
        },
        {
          icon: 'petpaw',
          text: 'Descontos em hotéis para pets',
        },
      ],
    },
  },
  life_security: {
    category: 'Seguro de Vida',
    title: 'Suporte em todos os momentos',
    text:
      'Coberturas e benefícios para você e sua família enfrentarem adversidades com mais tranquilidade.',
    image: lifeSecurityImg,
    productPath: '/seguro-vida',
    modalInfos: {
      title: 'Seguro Vida Porto Seguro',
      text: 'Conheça as principais vantagens:',
      items: [
        {
          icon: 'persongroup',
          text: 'Pagamento parcelado no cartão de crédito',
        },
        {
          icon: 'personaccident',
          text: 'Contratação 100% on-line',
        },
        {
          icon: 'computersecure',
          text: 'Assistência 24 horas em português de qualquer lugar do mundo',
        },
        {
          icon: 'money',
          text: 'Assistência em caso de extravio de bagagem',
        },
        {
          icon: 'phone',
          text: 'Coberturas médicas, hospitalares e odontológicas',
        },
        {
          icon: 'dollarsign',
          text: 'Descontos em hotéis para pets',
        },
      ],
    },
  },
  credit_card: {
    category: 'Cartão de Crédito',
    title: 'Benefícios além dos pontos',
    text:
      'Tudo o que um cartão tem, mais as vantagens Porto Seguro para sua casa, carro e compras.',
    image: creditCardImg,
    productPath: '/cartao-credito',
    modalInfos: {
      title: 'Cartão de Crédito Porto Seguro',
      text: 'Conheça as principais vantagens:',
      items: [
        {
          icon: 'money',
          text: 'Descontos na contratação e na franquia do Seguro Auto',
        },
        {
          icon: 'car2',
          text: 'Parcelamento do Seguro Auto em até 10x',
        },
        {
          icon: 'creditcard',
          text: 'Mais segurança com o cartão virtual para compras on-line',
        },
        {
          icon: 'smartphone',
          text: 'App exclusivo para acompanhar seus gastos',
        },
        {
          icon: 'computersecure',
          text:
            'Seguros e serviços especiais para proteger você e suas compras',
        },
        {
          icon: 'persongroup',
          text: 'Programa de Relacionamento sem taxa de adesão',
        },
      ],
    },
  },
}

export default productData
